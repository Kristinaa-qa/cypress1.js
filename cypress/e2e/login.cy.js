
describe('Автотесты на форму логина', function () {
   it('Верный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#mail').type('german@dolnikov.ru');
        cy.get('#pass').type('iLoveqastudio1');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })
    it('Верный логин и неверный пароль', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#mail').type('german@dolnikov.ru');
        cy.get('#loginButton').should('be.disabled');
        cy.get('#pass').type('iLoveqastudio111');
        cy.get('#loginButton').should('be.enabled');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик виден
    })
    it('Восстановление пароля', function () {
        cy.visit('https://login.qa.studio/'); // вход на сайт
        cy.get('#forgotEmailButton').click(); // клик забыл пароль
        cy.get('#forgotForm > .header').should('be.visible'); // текст виден
        cy.get('#forgotForm > .header').contains('Восстановите пароль'); // совпадение текста
        cy.get('#exitRestoreButton > .exitIcon').should('be.visible'); // крестик виден
        cy.get('#mailForgot').type('german5@dolnikov.ru'); // ввели логин
        cy.get('#restoreEmailButton').should('be.visible'); // текст виден
        cy.get('#restoreEmailButton').click(); // клик отправить код
        cy.get('#messageHeader').should('be.visible'); // текст виден
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // совпадение текста
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик виден
                  })
    it('Не верный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/'); // вход на сайт
        cy.get('#mail').type('german5@dolnikov.ru'); // ввести не правильный логин
        cy.get('#loginButton').should('be.disabled'); // кнопка войти не активна
        cy.get('#pass').type('iLoveqastudio1'); // вести верный пароль
        cy.get('#loginButton').should('be.enabled'); // кнопка войти активна
        cy.get('#loginButton').click(); // клик войти
        cy.get('#messageHeader').should('be.visible'); // текст виден
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // совпадение текста
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик виден
         })
    it('Негативный кейс валидации', function () {
        cy.visit('https://login.qa.studio/'); // вход на сайт
        cy.get('#mail').type('germandolnikov.ru'); // ввести не правильный логин без @
        cy.get('#loginButton').should('be.disabled'); // кнопка войти не активна
        cy.get('#pass').type('iLoveqastudio1'); // вести верный пароль
        cy.get('#loginButton').should('be.enabled'); // кнопка войти активна
        cy.get('#loginButton').click(); // клик войти        
        cy.get('#messageHeader').should('be.visible'); // текст виден
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // совпадение текста
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик виден
        })
    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio/'); // вход на сайт
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // ввести логин с заглавными буквами
        cy.get('#loginButton').should('be.disabled'); // кнопка войти не активна
        cy.get('#pass').type('iLoveqastudio1'); // вести верный пароль
        cy.get('#loginButton').should('be.enabled'); // кнопка войти активна
        cy.get('#loginButton').click(); // клик войти        
        cy.get('#messageHeader').should('be.visible'); // текст виден
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // не совпадение текста
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик виден
        })
})
