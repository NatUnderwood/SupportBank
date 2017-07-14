import * as fs from "fs"
import * as _ from "lodash"
import * as readline from "readline"
import  {IOU} from './IOU'
import {Account} from './Account'

export class Template {

    public run(): void {
         fs.readFile('./Transactions2014.csv','utf8',(err,data) => {
            if (err){
                return console.log(err)
            }

            var iouArray:Array<IOU>=[];
            let lines: Array<string> = data.split("\n");
            for(var line of lines){
                let iou: IOU = new IOU(line);
                iouArray.push(iou);
            }

            var accountArray:Array<Account> =[];
            for (var owes of iouArray){
                let account1 = this.getAccount1(owes, accountArray);
                account1.AddIOU(owes);
                let account2 = this.getAccount2(owes, accountArray);
                account2.AddIOU(owes);
            }

            var question:string
            const readline = require('readline');
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('What would you like to do?',(answer) =>{
                if (answer == "List All"){
                    for (var account of accountArray) {
                        account.findBalance()
                    } 
                } else {
                    var count: number = 0;
                    for(var i = 0;i<accountArray.length;i++){
                        if (accountArray[i].name == answer) {
                            count = i
                            break
                        }
                    }
                    accountArray[count].printAccount()
                }
                
                rl.close();
            });
        });
    }

    private getAccount1(iou: IOU, accountArray: Array<Account>): Account {
        var matchingAccounts = _.filter(accountArray,(account1: Account)=>{
            return account1.name === iou.name1
            
        });

        const numberOfAccounts = matchingAccounts.length;
        if (numberOfAccounts === 1) {
            return _.head(matchingAccounts);
        } else if (numberOfAccounts === 0) {
            let newAccount1 = new Account(iou.name1);
            accountArray.push(newAccount1);
            return newAccount1 
        } else {
            throw new Error("Too many accounts!");
        }
    }

        private getAccount2(iou: IOU, accountArray: Array<Account>) {
        var matchingAccounts = _.filter(accountArray,(account2: Account)=>{
            return account2.name === iou.name2
            
        });

        const numberOfAccounts = matchingAccounts.length;
        if (numberOfAccounts === 1) {
            return _.head(matchingAccounts);
        } else if (numberOfAccounts === 0) {
            let newAccount2 = new Account(iou.name2);
            accountArray.push(newAccount2);
            return newAccount2 
        } else {
            throw new Error("Too many accounts!");
        }
    }
}

