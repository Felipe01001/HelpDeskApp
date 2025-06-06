pipeline {
    agent any

    stages {
        stage('Build Backend Docker') {
            steps {
                dir('backend') {
                    sh 'docker build -t agendamento-app .'
                }
            }
        }
        stage('Executar Container Backend') {
            steps {
                sh 'docker run -d --rm --name agendamento-app -p 8082:80 agendamento-app'
            }
        }
    }
}
