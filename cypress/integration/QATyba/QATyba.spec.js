/// <reference types="cypress" />
context('Prueba de QA Engineers test', () => {
    beforeEach(() => {
        cy.viewport('macbook-16');
        cy.visit('https://www.metrocuadrado.com/calculadora-credito-hipotecario-vivienda/');
    })
    describe('Pruebas del NavBar', () => {
        it('Validar que los elementos del navbar existan y contengan el mensaje indicado', () => {
            cy.get('.navbar-wrapper > .container').should('be.visible');
            cy.get('.navbar-brand > .img-responsive').should('be.visible');
            cy.get('.active > .btn').should('be.visible').then(($mensaje) => {
                expect('Buscar Inmueble').to.equal($mensaje.text().trim());
            });
            cy.get('.hover_lg > .dropdown-toggle').should('be.visible').then(($mensaje) => {
                expect('Noticias y tendencias').to.equal($mensaje.text().trim());
            });
            cy.get('.hover_lg2 > .dropdown-toggle').should('be.visible').then(($mensaje) => {
                expect('Herramientas').to.equal($mensaje.text().trim());
            });
            cy.get('.navbar-right > .item_alt > .link').should('be.visible').then(($mensaje) => {
                expect('Ingresar').to.equal($mensaje.text().trim());
            });
            cy.get('#publishAPropertyLiHref').should('be.visible').then(($mensaje) => {
                expect('Publica tu inmueble').to.equal($mensaje.text().trim());
            });
        });
    });
    describe('Pruebas del body', () => {
        it('Validar que se indique la ruta de la pagina en la que se encuentra actualmente', () => {
            cy.get('.breadcrumb').should('be.visible');
            cy.get('.breadcrumb > :nth-child(1)').should('be.visible').and('contain.text', 'Inicio')
            cy.get('.breadcrumb > :nth-child(2) > a > span').should('be.visible').and('contain.text', 'Calculadora de crédito para vivienda');
        });
        it('Validar el mensaje de la herramienta que se esta utilizando, en este caso sera "CALCULADORA DE CRÉDITO PARA VIVIENDA"', () => {
            cy.get('h1').should('be.visible').then(($mensaje) => {
                let mensaje = $mensaje.text().trim();
                mensaje = mensaje.replace(/\n/g, " ");
                mensaje = mensaje.replace(/\t+/g, "")
                expect('Calculadora de Crédito para vivienda').to.equal(mensaje.trim());
            });
        });
        it('Validar el mensaje el cual instruye el usuario para que se utiliza la calculadora de credito', () => {
            cy.get(':nth-child(1) > .col-xs-12 > .texto_inicial').should('be.visible').then(($txt) => {
                let txtObtenido = $txt.text().trim();
                txtObtenido = txtObtenido.replace(/\n/g, " ");
                txtObtenido = txtObtenido.replace(/\t+/g, "");
                let txtEsperado = 'En nuestro simulador de crédito puedes calcular cuánto te puede prestar un banco para la compra de tu apartamento o casa, de acuerdo a tus ingresos mensuales, también puedes calcular el valor de la cuota mensual de tu crédito de vivienda.'
                expect(txtEsperado).to.equal(txtObtenido);
            });
        });
        it('Validar la opcion de cuanto te prestan segun tus ingresos mensuales y el plazo en años', () => {
            cy.get('.verprestamo').should('be.visible').click({ force: true }).then(($txt) => {
                let txtObtenido = $txt.text().trim();
                txtObtenido = txtObtenido.replace(/\n/g, " ");
                txtObtenido = txtObtenido.replace(/\t+/g, "");
                let txtEsperado = 'Calcula cuánto te prestan'
                expect(txtEsperado).to.equal(txtObtenido);
            });
            cy.get('.prestamo > .col-md-5 > h2').should('be.visible').then(($txt) => {
                let txtObtenido = $txt.text().trim();
                txtObtenido = txtObtenido.replace(/\n/g, " ");
                txtObtenido = txtObtenido.replace(/\t+/g, "");
                let txtEsperado = 'Calcula cuánto te prestan'
                expect(txtEsperado).to.equal(txtObtenido);
            });
            cy.get(`[ng-class="{'error': (MonthlyIncomeForm.monthlyIncome.$error.required && MonthlyIncomeForm.monthlyIncome.$touched) || (!MonthlyIncomeForm.monthlyIncome.$error.required && MonthlyIncomeForm.monthlyIncome.$invalid && MonthlyIncomeForm.monthlyIncome.$touched)}"] > .valign > h3`).should('be.visible').then(($txt) => {
                let txtObtenido = $txt.text().trim();
                txtObtenido = txtObtenido.replace(/\n/g, " ");
                txtObtenido = txtObtenido.replace(/\t+/g, "");
                let txtEsperado = 'Ingresos mensuales:'
                expect(txtEsperado).to.equal(txtObtenido);
            });
            cy.get('#ingresosMensuales').should('be.visible').and('have.attr', 'limit-to', '9').type('5500000');
            cy.get(`[ng-class="{'error': (MonthlyIncomeForm.monthlyIncome.$error.required && MonthlyIncomeForm.monthlyIncome.$touched) || (!MonthlyIncomeForm.monthlyIncome.$error.required && MonthlyIncomeForm.monthlyIncome.$invalid && MonthlyIncomeForm.monthlyIncome.$touched)}"] > .m2-icon`).click();
            cy.get('.prestamo > .col-md-5 > form.ng-valid-max > :nth-child(2) > .form-control').should('be.visible').select('number:20');
            cy.get('.prestamo > .imagen > img').should('be.visible')
            cy.get('.prestamo > .imagen > .recuadro > h3').should('be.visible').and('contain.text', '¿Deseas comprar vivienda?')
        });
        it('Validar que al presionar el boton calcular el credito se muestren la opciones pertinentes como: "Con un ingreso mensual de: ", "Un banco puede prestarte hasta: ", "Debe tener una cuota inicial mínima de: ", "Puede comprar un inmueble de:"', () => {
            cy.get('#ingresosMensuales').should('be.visible').and('have.attr', 'limit-to', '9').type('5500000');
            cy.get(`[ng-class="{'error': (MonthlyIncomeForm.monthlyIncome.$error.required && MonthlyIncomeForm.monthlyIncome.$touched) || (!MonthlyIncomeForm.monthlyIncome.$error.required && MonthlyIncomeForm.monthlyIncome.$invalid && MonthlyIncomeForm.monthlyIncome.$touched)}"] > .m2-icon`).click();
            cy.get('.prestamo > .col-md-5 > form.ng-valid-max > :nth-child(2) > .form-control').should('be.visible').select('number:20');
            cy.get('.prestamo > .col-md-5 > form.ng-valid-max > .btn > h4').click('center', { force: true });
            cy.get('.prestamo > .imagen > img').should('not.be.visible');
            cy.get('.prestamo > .resultados > .datos_superior > :nth-child(1) > dt > .escritorio').should('be.visible').then(($txt) => {
                let txtObtenido = $txt.text().trim();
                let txtEsperado = 'Con un ingreso mensual de:'
                txtObtenido = txtObtenido.replace(/\n/g, " ");
                txtObtenido = txtObtenido.replace(/\t+/g, "");
                expect(txtEsperado).to.equal(txtObtenido);
            });
            cy.get('.prestamo > .resultados > .datos_superior > :nth-child(2) > dt > .escritorio').should('be.visible').then(($txt) => {
                let txtObtenido = $txt.text().trim();
                let txtEsperado = 'Un banco puede prestarte hasta:'
                txtObtenido = txtObtenido.replace(/\n/g, " ");
                txtObtenido = txtObtenido.replace(/\t+/g, "");
                expect(txtEsperado).to.equal(txtObtenido);
            });
            cy.get('.prestamo > .resultados > .datos_superior > :nth-child(3) > dt > .escritorio').should('be.visible').then(($txt) => {
                let txtObtenido = $txt.text().trim();
                let txtEsperado = 'Debe tener una cuota inicial mínima de:'
                txtObtenido = txtObtenido.replace(/\n/g, " ");
                txtObtenido = txtObtenido.replace(/\t+/g, "");
                expect(txtEsperado).to.equal(txtObtenido);
            });
            cy.get('.prestamo > .resultados > .datos_superior > :nth-child(4) > dt > .escritorio').should('be.visible').then(($txt) => {
                let txtObtenido = $txt.text().trim();
                let txtEsperado = 'Puede comprar un inmueble de:'
                txtObtenido = txtObtenido.replace(/\n/g, " ");
                txtObtenido = txtObtenido.replace(/\t+/g, "");
                expect(txtEsperado).to.equal(txtObtenido);
            });
        });
        it('Validar que al presionar el boton calcular el credito se muestren los valores de los calculos correspondientes a las opciones mostradas', () => {
            var vlrEsperado30 = '';
            var vlrObtenidoTotal = '';
            cy.get('#ingresosMensuales').should('be.visible').and('have.attr', 'limit-to', '9').type('5500000');
            cy.get(`[ng-class="{'error': (MonthlyIncomeForm.monthlyIncome.$error.required && MonthlyIncomeForm.monthlyIncome.$touched) || (!MonthlyIncomeForm.monthlyIncome.$error.required && MonthlyIncomeForm.monthlyIncome.$invalid && MonthlyIncomeForm.monthlyIncome.$touched)}"] > .m2-icon`).click();
            cy.get('.prestamo > .col-md-5 > form.ng-valid-max > :nth-child(2) > .form-control').should('be.visible').select('number:20');
            cy.get('.prestamo > .col-md-5 > form.ng-valid-max > .btn > h4').click('center', { force: true });
            cy.get('.prestamo > .imagen > img').should('not.be.visible');
            cy.get('.prestamo > .resultados > .datos_superior > :nth-child(1) > .ng-binding').should('be.visible').then(($txt) => {
                let txtObtenido = $txt.text().trim();
                let txtEsperado = '5500000';
                txtObtenido = txtObtenido.replace(/[$,]/g, '')
                expect(txtObtenido.trim()).to.be.equal(txtEsperado);
            });
            cy.get('.prestamo > .resultados > .datos_superior > :nth-child(4) > .ng-binding').should('be.visible').then(($txt) => {
                let txtObtenido = $txt.text().trim();
                txtObtenido = txtObtenido.replace(/[$,]/g, '').trim();
                vlrObtenidoTotal = parseInt(txtObtenido);
                let vlr30 = vlrObtenidoTotal * 0.3;
                vlrEsperado30 = Math.round(vlr30).toString();
            });
            cy.get('.prestamo > .resultados > .datos_superior > :nth-child(3) > .ng-binding').should('be.visible').then(($txt) => {
                let txtObtenido = $txt.text().trim();
                txtObtenido = txtObtenido.replace(/[,$]/g, '').trim();
                let txtEsperado = vlrEsperado30;
                expect(txtObtenido).to.be.contain(txtEsperado);
            });
            cy.get('.prestamo > .resultados > .datos_superior > :nth-child(2) > .ng-binding').should('be.visible').then(($txt) => {
                let txtObtenido = $txt.text().trim();
                txtObtenido = txtObtenido.replace(/[$,]/g, '').trim();
                let txtEsperado = vlrObtenidoTotal - vlrEsperado30
                expect(txtObtenido).to.be.contain(txtEsperado.toString());
            });
            cy.get(`[ng-class="{'valor_result': bank.state == 'S'}"]`).then(($txt) => {
                let txtObtenido = $txt.text().trim();
                txtObtenido = txtObtenido.replace(/[$,]/g, '').trim();
                let txtEsperado = vlrObtenidoTotal - vlrEsperado30;
                expect(txtObtenido).to.be.equal(txtEsperado.toString())
            });
            cy.get('.inactivo > :nth-child(3)').then(($txt) => {
                let txtObtenido = $txt.text().trim();
                txtObtenido = txtObtenido.replace(/[$,]/g, '').trim();
                let n = 20 * 12;
                let Monto = vlrObtenidoTotal - vlrEsperado30;
                let MV = (Math.pow((1 + 0.1025), (30 / 360)) - 1);
                console.log(MV * 100);
                let Cuota = Monto * (MV * Math.pow((1 + MV), n)) / (Math.pow((1 + MV), n) - 1)
                console.log(Cuota);
            });
        });
        it('Validar que el monto ingresado debe ser superior a $737,717.', () => {
            cy.get('#ingresosMensuales').should('be.visible').and('have.attr', 'limit-to', '9').type('200');
            cy.get(`[ng-class="{'error': (MonthlyIncomeForm.monthlyIncome.$error.required && MonthlyIncomeForm.monthlyIncome.$touched) || (!MonthlyIncomeForm.monthlyIncome.$error.required && MonthlyIncomeForm.monthlyIncome.$invalid && MonthlyIncomeForm.monthlyIncome.$touched)}"] > .m2-icon`).click();
            cy.get('.error > .ng-binding').then(($txt) => {
                let txtObtenido = $txt.text().trim();
                let txtEsperado = '737717';
                txtObtenido = txtObtenido.replace(/[$,a-zA-Z.]/g, '').trim()
                expect(txtObtenido).to.be.equal(txtEsperado);
            });
        });
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
});