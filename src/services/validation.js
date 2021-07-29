class Validation {
    isEmpyt(val){
        const arrVal = String(val).split("");
        if(arrVal.every(a => a == " ") == true || val.length == 0 || val == " " || val == ""){ return true }
        return false
    }
    isValid(val){
        if(val == undefined){
            console.log('undefined')
            return false
        }
        return true
    }


    HasEmpetyItem(array){
        let res = false;
        array.forEach(item => {
            console.log(`item: ${item}`)
            const itemArr = String(item).split("");
            if(itemArr.every(a => a == " ") == true || item.length == 0|| item == " " || item == ""){
                console.log(item);
                res = true;
            };
        });

        return res;
    }
    HasInvalidItem(array){
        let res = false;
        
        array.forEach(item => {
            if(item == undefined){
                res = true;
            };
        });

        return res
    }
}

module.exports = new Validation()