pipeline {
    agent any

    stages {
        stage('Clonar projeto') {
            steps {
                git 'https://github.com/Felipe01001/HelpDeskApp.git'
            }
        }

        stage('Build Backend Docker') {
            steps {
                dir('backend') {
                    script {
                        docker.build('agendamento-app')
                    }
                }
            }
        }

        stage('Executar Container Backend') {
            steps {
                script {
                    docker.image('agendamento-app').run()
                }
            }
        }
    }
}
