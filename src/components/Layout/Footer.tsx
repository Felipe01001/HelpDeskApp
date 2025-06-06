
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-tech rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">TI Support</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Sistema completo de suporte técnico em TI com agendamento de atendimentos. 
              Gerencie suas solicitações de forma eficiente e profissional.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/cadastro" className="text-gray-400 hover:text-white transition-colors">
                  Cadastro
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Email: suporte@tisupport.com</span>
              </li>
              <li>
                <span className="text-gray-400">Telefone: (11) 9999-9999</span>
              </li>
              <li>
                <span className="text-gray-400">Horário: 08h às 18h</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 TI Support. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
