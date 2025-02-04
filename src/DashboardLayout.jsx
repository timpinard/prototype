import React, { useState } from 'react';
import { LayoutGrid, Plus, PlusSquare, Settings, LogOut, ChevronDown, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data
const sampleChartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 }
];

const availableItems = {
  'Reports': ['Monthly Sales Report', 'Customer Analysis', 'Inventory Status'],
  'Charts': ['Revenue Trend', 'User Growth', 'Performance Metrics'],
  'FO Tables': ['Order Summary', 'Product Catalog', 'User Directory']
};

const DashboardLayout = () => {
  const [selectedDashboard, setSelectedDashboard] = useState('Marketing Dashboard');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAddTileModal, setShowAddTileModal] = useState(false);
  const [selectedType, setSelectedType] = useState('Reports');
  const [selectedItem, setSelectedItem] = useState('');

  const dashboards = [
    'Marketing Dashboard',
    'Sales Analytics',
    'Operations Overview'
  ];

  const AddTileModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Tile</h2>
          <button onClick={() => setShowAddTileModal(false)} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select 
              className="w-full border rounded-lg p-2"
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setSelectedItem('');
              }}
            >
              {Object.keys(availableItems).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Available Items</label>
            <select 
              size={5}
              className="w-full border rounded-lg p-2"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
            >
              {availableItems[selectedType].map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <button 
            className="w-full bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700"
            onClick={() => setShowAddTileModal(false)}
          >
            Create Tile
          </button>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Navigation */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <div className="mb-6 relative">
            <div 
              className="flex items-center justify-between p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="font-medium">{selectedDashboard}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>

            {isDropdownOpen && (
              <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
                {dashboards.map(dashboard => (
                  <div
                    key={dashboard}
                    className="p-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedDashboard(dashboard);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {dashboard}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <button className="flex items-center w-full p-2 space-x-2 text-left border rounded-lg hover:bg-gray-50">
              <PlusSquare className="w-5 h-5 text-blue-600" />
              <span>Create Dashboard</span>
            </button>
            
            <button 
              className="flex items-center w-full p-2 space-x-2 text-left border rounded-lg hover:bg-gray-50"
              onClick={() => setShowAddTileModal(true)}
            >
              <Plus className="w-5 h-5 text-green-600" />
              <span>Add New Tile</span>
            </button>
            
            <button className="flex items-center w-full p-2 space-x-2 text-left border rounded-lg hover:bg-gray-50">
              <Settings className="w-5 h-5 text-purple-600" />
              <span>Switch Mode</span>
            </button>
            
            <button className="flex items-center w-full p-2 space-x-2 text-left border rounded-lg hover:bg-gray-50">
              <LogOut className="w-5 h-5 text-red-600" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Title Bar */}
        <div className="flex items-center justify-between p-4 bg-white shadow">
          <h1 className="text-xl font-semibold">{selectedDashboard}</h1>
          <div className="flex items-center space-x-4">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Manage Users</span>
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">John Doe</span>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Sample tiles */}
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="mb-4 text-lg font-medium">Sample Chart</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sampleChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="mb-4 text-lg font-medium">Sample Report</h3>
              <div className="space-y-2">
                <div className="p-2 bg-gray-50 rounded">Report Item 1</div>
                <div className="p-2 bg-gray-50 rounded">Report Item 2</div>
                <div className="p-2 bg-gray-50 rounded">Report Item 3</div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="mb-4 text-lg font-medium">Sample Data Table</h3>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="p-2 text-left bg-gray-50">Column 1</th>
                    <th className="p-2 text-left bg-gray-50">Column 2</th>
                    <th className="p-2 text-left bg-gray-50">Column 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">Data 1</td>
                    <td className="p-2">Data 2</td>
                    <td className="p-2">Data 3</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Data 4</td>
                    <td className="p-2">Data 5</td>
                    <td className="p-2">Data 6</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="mb-4 text-lg font-medium">HTML Panel</h3>
              <div className="prose">
                <p>This is a sample HTML panel that can contain formatted content.</p>
                <ul>
                  <li>Feature 1</li>
                  <li>Feature 2</li>
                  <li>Feature 3</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Tile Modal */}
      {showAddTileModal && <AddTileModal />}
    </div>
  );
};

export default DashboardLayout;