declare module 'plotly' 

interface Process {
    env: {
        NODE_ENV: string,
    }
}
declare var process: Process
declare var window: Window
