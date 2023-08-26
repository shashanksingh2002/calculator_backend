const { historyUpdate } = require("../backend/database");

class Stack {
    constructor() {
        this.items = [];
    }

    // Push an element onto the stack
    push(element) {
        this.items.push(element);
    }

    // Remove and return the top element from the stack
    pop() {
        if (!this.isEmpty()) {
            return this.items.pop();
        }
    }

    // Return the top element without removing it
    top() {
        if (!this.isEmpty()) {
            return this.items[this.items.length - 1];
        }
    }

    // Check if the stack is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get the number of elements in the stack
    size() {
        return this.items.length;
    }

    // Clear the stack
    clear() {
        this.items = [];
    }

}

module.exports = {
    getCalulations: async(query) => {
        let ans = 0;
        let arr = [];
        for(let i=0;i<query.length;i++){
            const element = query[i];
            if(element === 'plus'){
                arr.push('+');
            }
            else if(element === 'minus'){
                arr.push('-');
            }
            else if(element === 'into'){
                arr.push('*');
            }
            else if(element === 'divide'){
                arr.push('/');
            }
            else if(element === 'intdiv'){
                arr.push('//');
            }
            else if(element === 'mod'){
                arr.push('%');
            }
            else if(element === 'pow'){
                arr.push('^');
            }
            else if(!isNaN(element)){
                arr.push(Number(element));
            }
            else{
                return {"Error": 1, "Message": "Wrong Parameters"};
            }
        }
        const stack = new Stack();
        for(let i=0;i<arr.length;i++) {
            if(stack.isEmpty()){
                if(isNaN(arr[i])){
                    return {"Error":1,"Message":"Wrong Parameters"};
                }
                stack.push(arr[i]);
            }
            else if(isNaN(arr[i]) && isNaN(stack.top())) {
                return {"Error":1,"Message":"Wrong Parameters"};
            }
            else if (!isNaN(stack.top()) && !isNaN(arr[i])) {
                return {"Error": 1, "Message": "Wrong Parameters"};
            }            
            else if(isNaN(arr[i])){
                stack.push(arr[i]);
            }
            else{
                const op2 = arr[i];
                const op = stack.top();
                stack.pop();
                const op1 = stack.top();
                stack.pop();
                if(op === '+'){
                    ans = op1 + op2;
                }
                else if(op === '-'){
                    ans = op1 - op2;
                }
                else if(op === '*'){
                    ans = op2 * op1;
                }
                else if(op === '/'){
                    if(op2 === 0){
                        return {"Error":1,"Message":"divide by 0"};
                    }
                    ans = op1 / op2;
                }
                else if(op === '//'){
                    if(op2 === 0){
                        return {"Error":1,"Message":"divide by 0"};
                    }
                    ans = Math.floor(op1 / op2);
                }
                else if(op === '%'){
                    if(op2 === 0){
                        return {"Error":1,"Message":"divide by 0"};
                    }
                    ans = op1 % op2;
                }
                else if(op === '^'){
                    ans = Math.pow(op1,op2);
                }
                else{
                    return {"Error":1,"Message":"Wrong Parameters"};
                }
                stack.push(ans);
            }
        }
        if(isNaN(stack.top())) return {"Error":1,"Message":"Wrong Parameters"};
        try{
            await historyUpdate(arr,stack.top());
        }
        catch{
            return {"Error":1,"Message":"Error from server"}
        }
        return {"Question":arr,"answer":stack.top()};
    }
}