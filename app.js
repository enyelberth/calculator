const container = document.querySelector('#container_number');
const input = document.querySelector('#input_text');

const buttons = [
    { label: 'C', type: 'clear' }, { label: '%', type: 'op' }, { label: '/', type: 'op' }, { label: '*', type: 'op' },
    { label: '7', type: 'num' },   { label: '8', type: 'num' }, { label: '9', type: 'num' }, { label: '-', type: 'op' },
    { label: '4', type: 'num' },   { label: '5', type: 'num' }, { label: '6', type: 'num' }, { label: '+', type: 'op' },
    { label: '1', type: 'num' },   { label: '2', type: 'num' }, { label: '3', type: 'num' }, { label: '=', type: 'equal' },
    { label: '0', type: 'num' },   { label: '.', type: 'num' }, { label: 'DEL', type: 'del' } // Botón para borrar último dígito
];

// Función para procesar la entrada
function handleInput(value) {
    const lastChar = input.value.slice(-1);
    const operators = ['+', '-', '*', '/', '%', '.'];

    if (value === 'C') {
        input.value = '';
    } else if (value === 'DEL') {
        input.value = input.value.slice(0, -1);
    } else if (value === '=') {
        try {
            // Reemplazamos símbolos visuales por matemáticos y evaluamos
            let result = eval(input.value.replace(/%/g, '/100'));
            // Limitamos decimales para no romper la pantalla
            input.value = Number.isInteger(result) ? result : result.toFixed(4);
        } catch {
            input.value = "Error";
            setTimeout(() => input.value = '', 1000);
        }
    } else {
        // Evitar operadores dobles: Si el nuevo es operador y el último también, no hacer nada
        if (operators.includes(value) && operators.includes(lastChar)) return;
        
        // Evitar empezar con un operador (excepto el punto o menos)
        if (input.value === '' && ['+', '*', '/', '%'].includes(value)) return;

        input.value += value;
    }
}

// Generar botones
buttons.forEach(btnData => {
    const btn = document.createElement('button');
    btn.textContent = btnData.label === '*' ? 'x' : btnData.label;
    
    let styles = "font-bold py-4 rounded-2xl transition-all active:scale-90 text-xl ";
    if (btnData.type === 'num') styles += "bg-slate-700 text-white";
    else if (btnData.type === 'op') styles += "bg-orange-500 text-white";
    else if (btnData.type === 'clear' || btnData.type === 'del') styles += "bg-red-500 text-white";
    else if (btnData.type === 'equal') styles += "bg-green-600 text-white row-span-2";

    if (btnData.label === '0') styles += " col-span-1"; // Ajustado para que quepa el DEL
    btn.className = styles;

    btn.onclick = () => handleInput(btnData.label);
    container.appendChild(btn);
});

// Soporte para teclado físico

window.addEventListener('keydown', (e) => {
    const validKeys = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.','%','Enter','Backspace','Escape'];
    if (!validKeys.includes(e.key)) return;

    if (e.key === 'Enter') handleInput('=');
    else if (e.key === 'Backspace') handleInput('DEL');
    else if (e.key === 'Escape') handleInput('C');
    else handleInput(e.key);
});