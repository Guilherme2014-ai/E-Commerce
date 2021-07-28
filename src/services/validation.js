class Validation {
    isEmpyt(val){
        val = String(val).split("");
        console.log(val)
        if(val.every(a => a == " " || val.length == 0 || val == "" || val == "")){ return true }
        return false
    }
    isValid(val){
        if(val == undefined){
            console.log('undefined')
            return false
        }
        return true
    }
}

module.exports = new Validation()