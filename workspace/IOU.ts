export class IOU {
    public date:string;
    public name1: string;
    public name2: string;
    public reason: string;
    public amount: string;
    constructor(line:string){
        let fields: Array<string> = line.split(',')
        this.date = fields[0]
        this.name1=fields[1]
        this.name2 = fields[2]
        this.reason = fields[3]
        this.amount = fields[4]
    }
}