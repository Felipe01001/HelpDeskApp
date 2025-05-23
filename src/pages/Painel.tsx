
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  User,
  Settings,
  BarChart3
} from 'lucide-react';

const Painel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Dados simulados - na implementação real viria do Supabase
  const agendamentos = [
    {
      id: '1',
      tipo: 'Problemas de Software',
      prioridade: 'alta',
      data: '2024-01-15',
      horario: '09:00',
      status: 'agendado',
      descricao: 'Sistema travando constantemente após atualização',
      criado_em: '2024-01-10'
    },
    {
      id: '2',
      tipo: 'Problemas de Hardware',
      prioridade: 'media',
      data: '2024-01-12',
      horario: '14:00',
      status: 'concluido',
      descricao: 'Computador não liga, possível problema na fonte',
      criado_em: '2024-01-08'
    },
    {
      id: '3',
      tipo: 'Instalação de Sistemas',
      prioridade: 'baixa',
      data: '2024-01-20',
      horario: '10:00',
      status: 'em_andamento',
      descricao: 'Instalação do novo sistema de gestão',
      criado_em: '2024-01-05'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      agendado: { label: 'Agendado', variant: 'default' as const, color: 'bg-blue-100 text-blue-700' },
      em_andamento: { label: 'Em Andamento', variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-700' },
      concluido: { label: 'Concluído', variant: 'default' as const, color: 'bg-green-100 text-green-700' },
      cancelado: { label: 'Cancelado', variant: 'destructive' as const, color: 'bg-red-100 text-red-700' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.agendado;
    
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const getPrioridadeBadge = (prioridade: string) => {
    const prioridadeConfig = {
      baixa: 'bg-green-100 text-green-700',
      media: 'bg-yellow-100 text-yellow-700',
      alta: 'bg-orange-100 text-orange-700',
      critica: 'bg-red-100 text-red-700'
    };

    return (
      <Badge className={prioridadeConfig[prioridade as keyof typeof prioridadeConfig]}>
        {prioridade.charAt(0).toUpperCase() + prioridade.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const stats = {
    total: agendamentos.length,
    pendentes: agendamentos.filter(a => a.status === 'agendado').length,
    concluidos: agendamentos.filter(a => a.status === 'concluido').length,
    emAndamento: agendamentos.filter(a => a.status === 'em_andamento').length
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-tech-50 via-white to-support-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <CardTitle>Acesso restrito</CardTitle>
            <CardDescription>
              Você precisa estar logado para acessar o painel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/login')} className="w-full">
              Fazer Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-tech-50 via-white to-support-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header do Painel */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Olá, {user.user_metadata?.nome || user.email?.split('@')[0]}!
              </h1>
              <p className="text-gray-600">
                Gerencie seus agendamentos e acompanhe o status dos atendimentos
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button asChild className="tech-shadow">
                <Link to="/agendar">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Agendamento
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-tech-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <p className="text-xs text-gray-600">agendamentos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pendentes
              </CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.pendentes}</div>
              <p className="text-xs text-gray-600">aguardando</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Em Andamento
              </CardTitle>
              <Settings className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.emAndamento}</div>
              <p className="text-xs text-gray-600">em execução</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Concluídos
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.concluidos}</div>
              <p className="text-xs text-gray-600">finalizados</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Agendamentos */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-tech-600" />
              Meus Agendamentos
            </CardTitle>
            <CardDescription>
              Acompanhe o status e detalhes dos seus agendamentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {agendamentos.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum agendamento encontrado
                </h3>
                <p className="text-gray-600 mb-6">
                  Você ainda não possui agendamentos. Crie seu primeiro agendamento agora!
                </p>
                <Button asChild>
                  <Link to="/agendar">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Agendamento
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {agendamentos.map((agendamento) => (
                  <div 
                    key={agendamento.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="flex items-center gap-4 mb-2 sm:mb-0">
                        <div className="w-10 h-10 bg-gradient-support rounded-lg flex items-center justify-center">
                          <Settings className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {agendamento.tipo}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {formatDate(agendamento.data)} às {agendamento.horario}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(agendamento.status)}
                        {getPrioridadeBadge(agendamento.prioridade)}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">
                      {agendamento.descricao}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 mb-2 sm:mb-0">
                        Criado em {formatDate(agendamento.criado_em)}
                      </p>
                      <div className="flex gap-2">
                        {agendamento.status === 'agendado' && (
                          <>
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              Cancelar
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Painel;
