pipeline {
    agent any

    options {
        skipDefaultCheckout()
        skipStagesAfterUnstable()
    }

    stages {
        stage('Checkout') {
            steps {
                cleanWs()
                echo 'Checkout..'
                checkout scm
            }
        }
        stage('Deploy to development') {
            when {
                branch 'dev'
            }

            steps {
                echo 'Deploying to development instance..'
                sh "git push -f git@heroku.com:iot-front-dev.git HEAD:master"
            }
        }
        stage('Deploy to production') {
            when {
                branch 'master'
            }

            steps {
                echo 'Deploying to production instance..'
                sh "git push -f git@heroku.com:iot-front-prod.git HEAD:master"
            }
        }
    }
}
