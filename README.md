# Projekt StudyQuiz
![alt text](https://project-studyquiz.netlify.app/StudyQuiz_Banner_Weiss_Transparent.png)


## Live Demo: https://project-studyquiz.netlify.app

Studyquiz ist ein Studienprojekt von vier Studierenden der Hochschule IU. Es soll ein kollaboratives und kooperatives Online Quizsystem werden, welches Studierende bei ihrem Lernprozess begleitet.

## Technologien

### Frontend

- **Vite** (Build Tool) https://vitejs.dev/
- **ReactJS** (Framework) https://react.dev/
- **ChakraUI** (Komponentenbibliothek) https://chakra-ui.com/
- **React Router** (Routing Bibliothek) https://reactrouter.com/en/main
- **React Icons** (Icon Sammlung) https://react-icons.github.io/react-icons/

### Backend

**Backend Repository:** https://github.com/PhilippDuck/project_studyquiz_backend

- **Realm** (BaaS Service) https://www.mongodb.com/developer/products/realm/
- **MongoDB** (NoSQL Datenbank) https://www.mongodb.com/atlas/database

Um das Backend nutzen zu können muss eine ".env" Datei im Wurzelverzeichnis des Projektes erstellt werden. Der Inhalt der Datei muss wie folgt aussehen:  
 "VITE_APP_ID=Application-Key"

## Hauptkomponenten

### Authentifizierung und Benutzerverwaltung

- **Register**: Ermöglicht es neuen Benutzern, sich zu registrieren.
- **Login**: Bietet eine Anmeldemöglichkeit für bestehende Benutzer.
- **ResetPassword**: Erlaubt das Zurücksetzen des Passworts über einen Token-basierten Mechanismus.
- **ConfirmRegistration**: Dient der Bestätigung der Benutzerregistrierung über einen E-Mail-Link.

### Quiz-Management

- **Create**: Ermöglicht das Erstellen neuer Quizfragen und -themen.
- **Games**: Zeigt eine Übersicht aller verfügbaren Quizspiele an und bietet Filteroptionen.
- **Game**: Steuert den Ablauf eines einzelnen Quizspiels, einschließlich der Bewertung von Antworten.
- **AdminPanel**: Eine Admin-Oberfläche für die Verwaltung von gemeldeten Fragen und Inhalten.
- Benutzerprofil und Interaktion
- **Profil**: Bietet eine Übersicht über Benutzerinformationen und erlaubt das Ändern des Nicknamens sowie das Löschen des Benutzerkontos.
- **NotFound**: Eine Fehlerseite, die angezeigt wird, wenn eine angeforderte Seite nicht gefunden wird.
