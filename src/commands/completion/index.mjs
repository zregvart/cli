/**
 * Creates the `netlify completion` command
 * @param {import('../base-command.mjs').default} program
 * @returns
 */

export const createCompletionCommand = (program) => {
  program
    .command('completion:install')
    .alias('completion:generate')
    .description('Generates completion script for your preferred shell')
    .action(async (options, command) => {
      const { completionGenerate } = await import('./completion.mjs')
      await completionGenerate(options, command)
    })

  program
    .command('completion:uninstall', { hidden: true })
    .alias('completion:remove')
    .description('Uninstalls the installed completions')
    .addExamples(['netlify completion:uninstall'])
    .action(async (options, command) => {
      const { uninstall } = await import('tabtab')

      await uninstall({
        name: command.parent.name(),
      })
    })

  return program
    .command('completion')
    .description('Generate shell completion script\nRun this command to see instructions for your shell.')
    .addExamples(['netlify completion:install'])
    .action((options, command) => {
      command.help()
    })
}
