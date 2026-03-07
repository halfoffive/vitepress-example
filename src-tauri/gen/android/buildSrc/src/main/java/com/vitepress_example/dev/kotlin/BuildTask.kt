import java.io.File
import org.apache.tools.ant.taskdefs.condition.Os
import org.gradle.api.DefaultTask
import org.gradle.api.GradleException
import org.gradle.api.logging.LogLevel
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.TaskAction

open class BuildTask : DefaultTask() {
    @Input
    var rootDirRel: String? = null
    @Input
    var target: String? = null
    @Input
    var release: Boolean? = null

    @TaskAction
    fun assemble() {
        val npmExecutable = findNpmExecutable();
        try {
            runTauriCli(npmExecutable)
        } catch (e: Exception) {
            throw GradleException("Failed to execute Tauri CLI: ${e.message}", e)
        }
    }

    private fun findNpmExecutable(): String {
        // Try to find npm using PATH
        val npmCmd = if (Os.isFamily(Os.FAMILY_WINDOWS)) "where.exe npm" else "which npm"
        try {
            val process = ProcessBuilder(npmCmd.split(" "))
                .redirectErrorStream(true)
                .start()
            val output = process.inputStream.bufferedReader().readText().trim()
            if (process.waitFor() == 0 && output.isNotEmpty()) {
                // Filter for valid npm executables
                val validPaths = output.lines().filter { path ->
                    val file = File(path)
                    file.exists() && (file.extension == "cmd" || file.extension == "exe" || file.extension == "ps1" || file.canExecute())
                }
                if (validPaths.isNotEmpty()) {
                    // Prefer npm.cmd on Windows
                    val cmdPath = validPaths.find { it.endsWith(".cmd") }
                    if (cmdPath != null) return cmdPath
                    return validPaths.first()
                }
            }
        } catch (e: Exception) {
            // Fallback to common locations
        }

        // Fallback to common paths (npm is usually in the same directory as node)
        val commonPaths = if (Os.isFamily(Os.FAMILY_WINDOWS)) {
            listOf(
                "D:\\Program Files\\nodejs\\npm.cmd",
                "C:\\Program Files\\nodejs\\npm.cmd",
                "C:\\Program Files (x86)\\nodejs\\npm.cmd",
                "${System.getenv("LOCALAPPDATA")}\\Programs\\nodejs\\npm.cmd"
            )
        } else {
            listOf("/usr/local/bin/npm", "/usr/bin/npm")
        }

        for (path in commonPaths) {
            if (File(path).exists()) {
                return path
            }
        }

        throw GradleException("Could not find npm executable. Please ensure Node.js and npm are installed and available in PATH.")
    }

    fun runTauriCli(executable: String) {
        val rootDirRel = rootDirRel ?: throw GradleException("rootDirRel cannot be null")
        val target = target ?: throw GradleException("target cannot be null")
        val release = release ?: throw GradleException("release cannot be null")
        
        // Use npm run to execute tauri command
        val args = mutableListOf("run", "tauri", "--", "android", "android-studio-script")

        if (project.logger.isEnabled(LogLevel.DEBUG)) {
            args.add("-vv")
        } else if (project.logger.isEnabled(LogLevel.INFO)) {
            args.add("-v")
        }
        if (release) {
            args.add("--release")
        }
        args.add("--target")
        args.add(target)

        val workingDir = File(project.projectDir, rootDirRel)
        project.logger.lifecycle("Running: $executable ${args.joinToString(" ")}")
        project.logger.lifecycle("Working directory: $workingDir")

        project.exec {
            this.workingDir = workingDir
            this.executable = executable
            this.args = args
        }.assertNormalExitValue()
    }
}