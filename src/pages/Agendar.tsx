
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

const Agendar = () => {
  const [formData, setFormData] = useState({
    tipo: '',
    prioridade: '',
    data: '',
    horario: '',
    descricao: '',
    contato: ''
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const tiposAtendimento = [
    { value: 'hardware', label: 'Problemas de Hardware' },
    { value: 'software', label: 'Problemas de Software' },
    { value: 'rede', label: 'Problemas de Rede' },
    { value: 'instalacao', label: 'Instalação de Sistemas' },
    { value: 'manutencao', label: 'Manutenção Preventiva' },
    { value: 'consultoria', label: 'Consultoria Técnica' },
    { value: 'outro', label: 'Outro' }
  ];

  const prioridades = [
    { value: 'baixa', label: 'Baixa', color: 'text-green-600' },
    { value: 'media', label: 'Média', color: 'text-yellow-600' },
    { value: 'alta', label: 'Alta', color: 'text-orange-600' },
    { value: 'critica', label: 'Crítica', color: 'text-red-600' }
  ];

  const horariosDisponiveis = [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const validateForm = () => {
    const required = ['tipo', 'prioridade', 'data', 'horario', 'descricao'];
    const missingFields = required.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return false;
    }

    if (formData.descricao.length < 10) {
      toast({
        title: 'Descrição muito curta',
        description: 'Por favor, forneça uma descrição mais detalhada do problema (mínimo 10 caracteres).',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Simulação de envio - na implementação real seria enviado para Supabase
      console.log('Agendamento criado:', {
        ...formData,
        usuario_id: user?.id,
        usuario_email: user?.email,
        criado_em: new Date().toISOString()
      });

      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: 'Agendamento realizado com sucesso!',
        description: 'Você receberá uma confirmação por email em breve.',
      });

      // Redirecionar para o painel
      navigate('/painel');
    } catch (error) {
      toast({
        title: 'Erro ao agendar',
        description: 'Ocorreu um erro inesperado. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-tech-50 via-white to-support-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <CardTitle>Acesso restrito</CardTitle>
            <CardDescription>
              Você precisa estar logado para agendar um atendimento.
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
    <div className="min-h-screen bg-gradient-to-br from-tech-50 via-white to-support-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-support rounded-2xl flex items-center justify-center support-shadow">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Agendar Atendimento
          </h1>
          <p className="text-gray-600">
            Preencha os dados abaixo para solicitar um atendimento técnico
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-tech-600" />
              Novo Agendamento
            </CardTitle>
            <CardDescription>
              Forneça o máximo de detalhes possível para um atendimento mais eficiente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Atendimento *</Label>
                  <Select 
                    value={formData.tipo} 
                    onValueChange={(value) => handleInputChange('tipo', value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposAtendimento.map((tipo) => (
                        <SelectItem key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prioridade">Prioridade *</Label>
                  <Select 
                    value={formData.prioridade} 
                    onValueChange={(value) => handleInputChange('prioridade', value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      {prioridades.map((prioridade) => (
                        <SelectItem key={prioridade.value} value={prioridade.value}>
                          <span className={prioridade.color}>
                            {prioridade.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="data">Data Preferida *</Label>
                  <Input
                    id="data"
                    type="date"
                    min={getMinDate()}
                    value={formData.data}
                    onChange={(e) => handleInputChange('data', e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horario">Horário Preferido *</Label>
                  <Select 
                    value={formData.horario} 
                    onValueChange={(value) => handleInputChange('horario', value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {horariosDisponiveis.map((horario) => (
                        <SelectItem key={horario} value={horario}>
                          {horario}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contato">Telefone para Contato</Label>
                <Input
                  id="contato"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.contato}
                  onChange={(e) => handleInputChange('contato', e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição do Problema *</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva detalhadamente o problema que você está enfrentando, incluindo mensagens de erro, quando ocorre, etc."
                  value={formData.descricao}
                  onChange={(e) => handleInputChange('descricao', e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-sm text-gray-500">
                  Mínimo 10 caracteres ({formData.descricao.length}/10)
                </p>
              </div>

              <div className="bg-tech-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-tech-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-tech-800 mb-1">Informações importantes:</p>
                    <ul className="text-tech-700 space-y-1 text-xs">
                      <li>• Agendamentos devem ser feitos com pelo menos 24h de antecedência</li>
                      <li>• Você receberá uma confirmação por email</li>
                      <li>• Nossa equipe entrará em contato 30 minutos antes do horário</li>
                      <li>• Atendimentos remotos são priorizados quando possível</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="submit" 
                  className="flex-1 h-11 support-shadow" 
                  disabled={loading}
                >
                  {loading ? 'Agendando...' : 'Confirmar Agendamento'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="h-11"
                  onClick={() => navigate('/painel')}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Agendar;
