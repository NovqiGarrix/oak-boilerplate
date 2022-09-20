import { Format, Houston, ConsoleTransport, LogLevel, TextPrefix, Color, dayjs } from '@deps';

const logger = new Houston([
    new ConsoleTransport([LogLevel["Error"], LogLevel["Success"], LogLevel["Warning"], LogLevel["Info"]], {
        format: Format["json"],
        prefix: new TextPrefix(dayjs().format("MMMM D, YYYY h:mm:ss A")),
        logColors: {
            [LogLevel.Info]: Color.Black,
            [LogLevel.Error]: Color.Red,
            [LogLevel.Success]: Color.Green,
            [LogLevel.Warning]: Color.Yellow
        }
    }),

    // Deno Deploy does not allow you to write files.

    // new FileTransport("./logs", [LogLevel["Error"]], {
    //     format: Format["text"],
    //     prefix: new TextPrefix(dayjs().format("MMMM D, YYYY h:mm:ss A")),
    // })
])

export default logger;