
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Settings, Shield, Users, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Calendar,
      title: 'Agendamento Inteligente',
      description: 'Agende atendimentos técnicos de forma rápida e organizada',
      color: 'tech'
    },
    {
      icon: Shield,
      title: 'Segurança Garantida',
      description: 'Autenticação segura com confirmação por email',
      color: 'support'
    },
    {
      icon: Users,
      title: 'Suporte Especializado',
      description: 'Equipe técnica qualificada para resolver seus problemas',
      color: 'tech'
    },
    {
      icon: Clock,
      title: 'Atendimento Rápido',
      description: 'Resposta em até 24 horas para todas as solicitações',
      color: 'support'
    }
  ];

  const stats = [
    { number: '500+', label: 'Atendimentos Realizados' },
    { number: '98%', label: 'Satisfação dos Clientes' },
    { number: '24h', label: 'Tempo Médio de Resposta' },
    { number: '50+', label: 'Técnicos Especializados' }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-tech-50 via-white to-support-50 pt-20 pb-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-tech rounded-2xl flex items-center justify-center tech-shadow">
                <Settings className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Sistema de{' '}
              <span className="bg-gradient-tech bg-clip-text text-transparent">
                Suporte Técnico
              </span>
              {' '}em TI
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto animate-fade-in">
              Gerencie suas solicitações de suporte técnico de forma eficiente e profissional. 
              Agende atendimentos, acompanhe o progresso e tenha acesso a uma equipe especializada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              {user ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="tech-shadow">
                    <Link to="/agendar">Agendar Atendimento</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/painel">Meu Painel</Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="tech-shadow">
                    <Link to="/cadastro">Começar Agora</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/login">Já tenho conta</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher nosso sistema?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oferecemos uma plataforma completa e moderna para gerenciamento 
              de suporte técnico em TI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-12 h-12 bg-gradient-${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como funciona?
            </h2>
            <p className="text-xl text-gray-600">
              Processo simples em 3 etapas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-tech rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Cadastre-se</h3>
              <p className="text-gray-600">
                Crie sua conta com email e senha. Confirme seu email para ativar a conta.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-support rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Agende</h3>
              <p className="text-gray-600">
                Descreva seu problema e escolha a melhor data e horário para o atendimento.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-tech rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Resolva</h3>
              <p className="text-gray-600">
                Nossa equipe técnica entrará em contato para resolver seu problema.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-20 bg-gradient-tech text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para começar?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Junte-se a centenas de empresas que já confiam em nosso sistema de suporte técnico.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/cadastro">Criar conta gratuita</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white hover:text-tech-600">
                <Link to="/login">Fazer login</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
