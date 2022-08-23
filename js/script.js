const calc = document.querySelector("#operacao");
const result = document.querySelector("#result");
const btn = document.querySelectorAll("#buttons-container button");

class operacao{
    constructor(calc,result) {
        this.calc = calc;
        this.result = result;
        this.digito = "";
    }
    // add digitos na tela
    addDigito(digit) {

        if(digit === "." && this.calc.innerText.includes(".")) {
            return;
        }

      this.digito = digit
      this.atualiza()
    }
    // operações
    calculo(resp) {

        if(this.result.innerText === "" && this.result.innerText !== "C") {
            if(this.calc.innerText !== "") {
                this.escolherOP(resp)
            }
            return;
        }

        let valor1 = +this.calc.innerText.split(" ")[0];
        let valor2 = +this.result.innerText;
        let resultado;

        switch(resp) {
            case "+":
                resultado = valor1 + valor2;
                this.atualiza(resultado, resp, valor1, valor2);
                break
            case "-":
                resultado = valor1 - valor2;
                this.atualiza(resultado, resp, valor1, valor2);
                break
            case "/":
                resultado = valor1 / valor2;
                this.atualiza(resultado, resp, valor1, valor2);
                break
            case "*":
                resultado = valor1 * valor2;
                this.atualiza(resultado, resp, valor1, valor2);
                break
            case "DEL":
                this.OPDel();
                break
            case "CE":
                this.OPce();
                break
            case "C":
                this.OPc();
                break
            case "=":
                this.OPigual();
                break
            default: return;
        }
    }
    atualiza(resultado = null, resp = null, valor1 = null, valor2 = null) {
        
        if(resultado === null) {
            this.result.innerText += this.digito;
        }else{
            if(valor1 === 0) {
                resultado = valor2;
            }

            this.calc.innerText = `${resultado}  ${resp}`;
            this.result.innerText = "";
        }
       
    }
    // escolhendo operações
    escolherOP(resp){
       const MathOP = ["*","+","-","/"];

        if(!MathOP.includes(resp) ) {
            return;
        }

        this.calc.innerText = this.calc.innerText.slice(0,-1) + resp;
    }
    //Deletando com DEL
   OPDel() {
        this.result.innerText = this.result.innerText.slice(0,-1);
   }
   //Deletando com CE
   OPce() {
    this.result.innerText = "";
   }
   //Deletando com C
   OPc() {
        this.result.innerText = "";
        this.calc.innerText = "";
   }
   // igualdade
   OPigual() {
    const resp = this.calc.innerText.split(" ")[1];
    this.calculo(resp);
   }
}

const op = new operacao(calc, result);

btn.forEach((button) => {
    button.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(Number(value) >= 0 || value === "."){

            op.addDigito(value);            

        }else{
            op.calculo(value);
            console.log(value)
        }
    })
});