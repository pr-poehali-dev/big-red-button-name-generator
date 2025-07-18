import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedName, setSelectedName] = useState<string>('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [namesList, setNamesList] = useState([
    'Александр', 'Мария', 'Дмитрий', 'Анна', 'Сергей', 'Елена', 'Павел', 'Ольга', 
    'Андрей', 'Татьяна', 'Максим', 'Светлана', 'Николай', 'Ирина', 'Владимир',
    'Екатерина', 'Роман', 'Наталья', 'Алексей', 'Юлия', 'Игорь', 'Валентина'
  ]);
  const [newName, setNewName] = useState('');
  
  const ADMIN_PASSWORD = 'chuvyrla2024';

  const selectRandomName = () => {
    const randomIndex = Math.floor(Math.random() * namesList.length);
    setSelectedName(namesList[randomIndex]);
    setIsRevealed(true);
  };

  const resetSelection = () => {
    setSelectedName('');
    setIsRevealed(false);
  };

  const addName = () => {
    if (newName.trim() && !namesList.includes(newName.trim())) {
      setNamesList([...namesList, newName.trim()]);
      setNewName('');
    }
  };

  const removeName = (name: string) => {
    setNamesList(namesList.filter(n => n !== name));
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setIsAdminDialogOpen(false);
      setAdminPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Неверный пароль');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminPassword('');
    setPasswordError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdminLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Чувырла дня!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Нажмите на большую красную кнопку и узнайте, кто сегодня главный чувырла!
            </p>
          </div>

          <div className="text-center mb-12">
            <div className="relative inline-block">
              <Button
                onClick={selectRandomName}
                className="text-2xl font-bold py-8 px-12 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-4 border-red-300"
                size="lg"
              >
                <Icon name="Dice1" className="mr-4" size={32} />
                Чувырла дня!
                <Icon name="Sparkles" className="ml-4" size={32} />
              </Button>
            </div>
            
            {isRevealed && (
              <Card className="max-w-lg mx-auto mt-8 animate-fade-in shadow-xl border-2 border-red-200">
                <CardHeader className="text-center bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
                  <CardTitle className="text-3xl font-bold">🎉 Поздравляем!</CardTitle>
                  <CardDescription className="text-red-100">
                    Сегодняшний чувырла определён!
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-red-600 mb-4">
                      {selectedName}
                    </div>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      Чувырла дня
                    </Badge>
                    <Button
                      onClick={resetSelection}
                      variant="outline"
                      className="mt-6 border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Icon name="RotateCcw" className="mr-2" size={18} />
                      Выбрать снова
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {isAdmin && (
            <>
              <Separator className="my-12" />
              <div className="flex justify-center mb-8">
                <Button
                  onClick={handleAdminLogout}
                  variant="outline"
                  className="bg-red-600 hover:bg-red-700 text-white border-red-600"
                >
                  <Icon name="LogOut" className="mr-2" size={18} />
                  Выйти из админ-панели
                </Button>
              </div>
            </>
          )}

          <div className="fixed bottom-4 right-4">
            <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="opacity-30 hover:opacity-100 transition-opacity bg-gray-100 hover:bg-gray-200 text-gray-600"
                >
                  <Icon name="Settings" size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    <Icon name="Shield" className="mx-auto mb-2" size={24} />
                    Вход в админ-панель
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Введите пароль для доступа к панели управления
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="password">Пароль</Label>
                    <Input
                      id="password"
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Введите пароль..."
                      className="mt-1"
                    />
                    {passwordError && (
                      <p className="text-sm text-red-600 mt-1">{passwordError}</p>
                    )}
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAdminDialogOpen(false);
                        setAdminPassword('');
                        setPasswordError('');
                      }}
                    >
                      Отмена
                    </Button>
                    <Button
                      onClick={handleAdminLogin}
                      disabled={!adminPassword.trim()}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Icon name="Check" className="mr-2" size={16} />
                      Войти
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {isAdmin && (
            <Card className="animate-fade-in shadow-xl border-2 border-gray-200 mt-8">
              <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold">
                  <Icon name="Users" className="mr-2" size={24} />
                  Управление списком имён
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Добавляйте и удаляйте имена из списка чувырл
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="list" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="list">Список имён</TabsTrigger>
                    <TabsTrigger value="add">Добавить имя</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="list" className="space-y-4">
                    <div className="text-center mb-4">
                      <Badge variant="secondary" className="text-lg px-4 py-2">
                        Всего имён: {namesList.length}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                      {namesList.map((name, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                          <span className="font-medium">{name}</span>
                          <Button
                            onClick={() => removeName(name)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:bg-red-50 border-red-300"
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="add" className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label htmlFor="newName" className="text-sm font-medium">
                          Новое имя
                        </Label>
                        <Input
                          id="newName"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="Введите имя..."
                          className="mt-1"
                          onKeyPress={(e) => e.key === 'Enter' && addName()}
                        />
                      </div>
                      <Button
                        onClick={addName}
                        disabled={!newName.trim()}
                        className="mt-6 bg-green-600 hover:bg-green-700"
                      >
                        <Icon name="Plus" className="mr-2" size={18} />
                        Добавить
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;