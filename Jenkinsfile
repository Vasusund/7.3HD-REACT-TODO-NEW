pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18'   
    }

    environment {
        PATH = "${tool('NodeJS 18')}/bin:${env.PATH}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'main', url: 'https://github.com/Vasusund/7.3H-SIT223.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies and building React app...'
                sh 'rm -rf node_modules'
                sh 'npm ci'
                sh 'npm install react-router-dom@6.17.0'
                sh 'npm run build'           // This creates the build artifact in /build
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests with Jest...'
                sh 'npm test -- --watchAll=false'   // Run all tests once
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint for code quality...'
                sh 'npm install -g eslint@8.0.0'
                sh 'eslint src/**/*.js || true'     // Run ESLint 
            }
        }

        stage('Security') {
            steps {
                echo 'Running npm audit for security vulnerabilities...'
                sh 'npm audit --audit-level=moderate || true'
                
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying React app to GitHub Pages...'
                sh 'npm install -g gh-pages'
                sh 'npm run deploy'  
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully! Your app is live on GitHub Pages.'
        }
        failure {
            echo 'Pipeline failed. Check the logs!'
        }
    }
}
