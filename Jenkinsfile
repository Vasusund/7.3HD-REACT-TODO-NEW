pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18'
    }

    environment {
        PATH = "${tool('NodeJS 18')}/bin:${env.PATH}"
        SNYK_TOKEN = credentials('synk-token')
        NETLIFY_TOKEN = credentials('NETLIFY_TOKEN')
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
                sh 'npx snyk auth $SNYK_TOKEN'
                sh 'npx snyk test --severity-threshold=medium || true'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                echo 'Deploying React app to Netlify (Test Environment)...'
                sh 'npm install -g netlify-cli'
               sh '''
    netlify deploy \
    --dir=build \
    --draft \
    --site=3b4a1073-470a-4122-b5f8-b861050171f3 \
    --auth=$NETLIFY_TOKEN
'''

            }
        }

    } // <-- Closing stages block

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs!'
        }
    }
}
