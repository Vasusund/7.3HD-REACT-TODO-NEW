pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18'
    }

    environment {
        PATH = "${tool('NodeJS 18')}/bin:${env.PATH}"
        SNYK_TOKEN = credentials('synk-token')
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'main', url: 'https://github.com/Vasusund/7.3HD-REACT-TODO-NEW.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies and building React app...'
                sh 'rm -rf node_modules'
                sh 'npm ci'
                sh 'npm install react-router-dom@6.17.0'
                sh 'npm run build'
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests with Jest...'
                sh 'npm test -- --watchAll=false'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint for code quality...'
                sh 'npm install -D eslint@8.0.0'
                sh 'npx eslint src/**/*.js || true'
            }
        }

        stage('Security') {
            steps {
                echo 'Running npm audit for security vulnerabilities...'
                sh 'npm audit --audit-level=moderate || true'

                echo 'Running Snyk security scan...'
                // Authenticate with Snyk using the Jenkins secret
                sh 'npx snyk auth $SNYK_TOKEN'
                sh 'npx snyk test --severity-threshold=medium || true'
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
