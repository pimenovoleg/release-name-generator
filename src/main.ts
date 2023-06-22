import { Definition, fetchDefinition } from '@/datamuse';
import { logger } from '@/logger';
import { sample, startCase } from '@/utils';
import { clipboard } from 'clipboard-sys';
import { Command } from 'commander';
import ora from 'ora';
import { version } from '../package.json';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

async function init() {
    const program = new Command();

    program
        .name('release-name-generator')
        .description('')
        .version(
            `Release Name Generator CLI v${version}`,
            '-v --version',
            'Outputs version number'
        );

    program
        .command('g', '')
        .description('generate release name')
        .action(async () => {
            const generateSpinner = ora(`Start generate release name...`).start();

            Promise.all([
                fetchRandomWordOfType('adj', 'angular'),
                fetchRandomWordOfType('n', 'next')
            ])
                .then((values) => values.map(startCase).join(' '))
                .then(async (item) => {
                    generateSpinner.succeed();
                    await clipboard.writeText(item);

                    logger.info('Release name (copy to clipboard): ', item);
                });
        });

    program.showSuggestionAfterError();

    await program.parseAsync(process.argv);
}

const fetchRandomWordOfType = async (type: string, fallback: string) => {
    return await fetchRandomWordsOfType(type).then((words: any) => {
        return sample(words) || fallback;
    });
};

const fetchRandomWordsOfType = async (type: any) => {
    const data = (await fetchWordsStartingWithLetter(
        sample('abcdefghijklmnopqrstuvwxyz')
    )) as Definition[];

    const dataMap = data
        .filter(({ tags = [] }) => tags.includes(type as never))
        .map((item: Definition) => item.word);

    return dataMap;
};

const fetchWordsStartingWithLetter = async (word: string) => {
    return await fetchDefinition(word);
};

init().catch((err) => {
    console.error(`Unexpected error - `, err);
});
