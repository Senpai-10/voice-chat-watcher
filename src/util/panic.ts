/** Print message and exit with `exit code 1` */
export function panic(message: string) {
    console.log(`[panic] ${message}`);
    process.exit(1);
}
