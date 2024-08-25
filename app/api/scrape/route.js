import { NextResponse } from "next/server";
import { spawn, exec } from 'child_process'

export async function POST(req) {
    const data = await req.json()
    const url = data.url
    console.log(url)
    const command = `python rateMyProfScraping.py ${url}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
    });

    exec('python load.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
    });

    return new NextResponse("Done")
}