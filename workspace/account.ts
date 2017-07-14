import {IOU} from './IOU'
export class Account{
    public name: string
    public balance: number
    public moneyArray: Array<IOU> =[];
    public AddIOU(cash: IOU){
        this.moneyArray.push(cash)
    }
    public findBalance(){
        this.balance = 0
        for (var entry of this.moneyArray){
            if (entry.name1 == this.name){
                this.addMoney(Number(entry.amount))
            }
            else {
                this.takeMoney(Number(entry.amount))
            }
        }
        console.log(this.name + " has " + this.balance)
    }
    public printAccount(){
        console.log(this.moneyArray)

    }

    public addMoney(amount: number){
        this.balance = this.balance + amount
    }
    public takeMoney(amount: number){
        this.balance =  this.balance - amount
    }
    constructor(name: string){
        this.name = name
    }

}