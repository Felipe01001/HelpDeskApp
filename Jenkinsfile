pipeline {
    agent any

    stages {
        stage('Build e Executar Backend') {
            steps {
                script {
                    // Entra na pasta onde está o Dockerfile (ex: backend/)
                    dir('backend') {
                        def imagem = docker.build('agendamento-app')
                        imagem.run()
                    }
                }
            }
        }
    }
}
