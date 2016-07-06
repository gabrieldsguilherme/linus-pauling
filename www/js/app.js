$(document).ready(function() {
    $('#resultado').hide();
    $('#refazer').hide();
});

function continuar() {
    var eletrons = getNumeroEletrons();

    if (eletrons === undefined || eletrons == null || eletrons == '') {
        Materialize.toast('Preencha o número de Elétrons!', 3000);
    } else if (eletrons < 1 || eletrons > 112) {
        Materialize.toast('Valor não existente no diagrama!', 3000);
        $('#eletrons').text('');
    } else {
        var elementos = getElementos();
        var ordemEnergetica = '';
        var ordemGeometrica = [];
        var ordemGeometricaFormatada = '';
        var eletronsPorCamada = inicializaEletronsPorCamada();
        var eletronsPorCamadaFormatado = '';
        var subnivelMaisEnergetico = '';
        var camadaValencia = '';

        var i = 0;
        var total = 0;

        while (eletrons > total) {
            var elemento = '';
            elemento += elementos[i][0] + elementos[i][1];

            if (eletrons > total + elementos[i][2]) {
                elemento += elementos[i][2];
                ordemEnergetica += elemento + ', ';
            } else {
                elemento += eletrons - total;
                ordemEnergetica += elemento;
                ordemGeometrica[elemento.charAt(0) - 1] = getElementoParaCamada(ordemGeometrica, elemento);
                
                var eletronsParaAdicionarNaCamada = 0;
                if (elemento.charAt(3) === "") {
                    eletronsParaAdicionarNaCamada = Number(elemento.charAt(2));
                } else {
                    eletronsParaAdicionarNaCamada = Number(String(elemento.charAt(2) + elemento.charAt(3)));
                }

                eletronsPorCamada[elemento.charAt(0) - 1] = eletronsPorCamada[elemento.charAt(0) - 1] + eletronsParaAdicionarNaCamada;
                subnivelMaisEnergetico = 'Subnível ' + elemento + '.';
                break;
            }

            ordemGeometrica[elemento.charAt(0) - 1] = getElementoParaCamada(ordemGeometrica, elemento) + ' ';

            var eletronsParaAdicionarNaCamada = 0;
            if (elemento.charAt(3) === "") {
                eletronsParaAdicionarNaCamada = Number(elemento.charAt(2));
            } else {
                eletronsParaAdicionarNaCamada = Number(String(elemento.charAt(2) + elemento.charAt(3)));
            }

            eletronsPorCamada[elemento.charAt(0) - 1] = eletronsPorCamada[elemento.charAt(0) - 1] + eletronsParaAdicionarNaCamada;

            total += elementos[i][2];
            i++;
        }

        ordemGeometricaFormatada = formatarENomearCamadas(ordemGeometrica);
        eletronsPorCamadaFormatado = getEletronsPorCamada(eletronsPorCamada);
        camadaValencia = getUltimaCamada(eletronsPorCamada);

        $('#oe').text(ordemEnergetica);
        $('#og').text(ordemGeometricaFormatada);
        $('#epc').text(eletronsPorCamadaFormatado);
        $('#sme').text(subnivelMaisEnergetico);
        $('#cv').text(camadaValencia);

        $('#resultado').show('500');
        $('#refazer').show('150');
        $('#continuarDiv').hide('150');
    }
}

function refazer() {
    $('#eletrons').val('');
    $('#continuarDiv').show('500');
    $('#resultado').hide('500');
    $('#refazer').hide('150');
}

function getElementos() {
    return [
        [1, 's', 2 ],
        [2, 's', 2 ],
        [2, 'p', 6 ],
        [3, 's', 2 ],
        [3, 'p', 6 ],
        [4, 's', 2 ],
        [3, 'd', 10],
        [4, 'p', 6 ],
        [5, 's', 2 ],
        [4, 'd', 10],
        [5, 'p', 6 ],
        [6, 's', 2 ],
        [4, 'f', 14],
        [5, 'd', 10],
        [6, 'p', 6 ],
        [7, 's', 2 ],
        [5, 'f', 14],
        [6, 'd', 10]
    ];
}

function inicializaEletronsPorCamada() {
    return [
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ];
}

function getNomesCamadas() {
    return [
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q'
    ];
}

function getNumeroEletrons() {
    return document.getElementById('eletrons').value;
}

function getElementoParaCamada(ordemGeometrica, elemento) {
    if (ordemGeometrica[elemento.charAt(0) - 1] === undefined) {
        return elemento;
    } else {
        return ordemGeometrica[elemento.charAt(0) - 1] + elemento;
    }
}

function formatarENomearCamadas(ordemGeometrica) {
    var ordemGeometricaFormatada = '';
    var nomesCamadas = getNomesCamadas();
    for (i = 0; i < ordemGeometrica.length; i++) {
        ordemGeometricaFormatada += nomesCamadas[i] + ': ' + ordemGeometrica[i];
        if (i + 1 < ordemGeometrica.length) {
            ordemGeometricaFormatada += ' | ';
        }
    }
    return ordemGeometricaFormatada;
}

function getEletronsPorCamada(eletronsPorCamada) {
    var eletronsPorCamadaFormatado = '';
    for (i = 0; i < eletronsPorCamada.length; i++) {
        if (eletronsPorCamada[i] > 0) {
            eletronsPorCamadaFormatado += getNomesCamadas()[i] + ': ' + eletronsPorCamada[i];
            if (eletronsPorCamada[i+1] > 0) {
                eletronsPorCamadaFormatado += ' | ';
            }
        } else {
            break;
        }
    }
    return eletronsPorCamadaFormatado;
}

function getUltimaCamada(eletronsPorCamada) {
    for (i = 0; i < eletronsPorCamada.length; i++) {
        if (eletronsPorCamada[i] == 0) {
            return 'Camada ' + getNomesCamadas()[i-1] + '.';
        } else if (i+1 >= eletronsPorCamada.length) {
            return 'Camada ' + getNomesCamadas()[i] + '.';
        }
    }
}