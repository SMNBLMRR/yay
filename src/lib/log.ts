export const log = {
    error:(...args:any) => console.log("%c" + args, "color:red"),
    warn:(...args:any) => console.log("%c" + args,"color:yellow"),
    info:(...args:any) => console.log("%c" + args),
    trace:(...args:any) => console.log("%c" + args,"color:blue") 
}