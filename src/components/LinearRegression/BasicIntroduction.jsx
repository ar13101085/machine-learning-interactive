import React from 'react';

const BasicIntroduction = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Linear Regression কি?</h3>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">সংক্ষিপ্ত পরিচয়</h4>
        <p className="text-gray-600 leading-relaxed mb-4">
          Linear Regression হলো একটি Machine Learning Algorithm যা দুটি variable এর মধ্যে সম্পর্ক খুঁজে বের করে। 
          এটি একটি সরল রেখা (straight line) ব্যবহার করে data points গুলোর pattern বোঝার চেষ্টা করে।
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
          <p className="text-blue-700">
            <strong>মূল ধারণা:</strong> যদি X বাড়ে, তাহলে Y কিভাবে পরিবর্তন হয়?
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">বাস্তব জীবনে ব্যবহার</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-700 mb-2">🏠 বাড়ির দাম নির্ধারণ</h5>
            <p className="text-sm text-gray-600">
              বাড়ির আয়তন থেকে দাম অনুমান করা
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-700 mb-2">📚 পরীক্ষার নম্বর</h5>
            <p className="text-sm text-gray-600">
              পড়াশোনার সময় থেকে নম্বর অনুমান করা
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-700 mb-2">🌡️ বিক্রয় পূর্বাভাস</h5>
            <p className="text-sm text-gray-600">
              তাপমাত্রা থেকে আইসক্রিম বিক্রয় অনুমান
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-700 mb-2">💰 আয় নির্ধারণ</h5>
            <p className="text-sm text-gray-600">
              অভিজ্ঞতা থেকে বেতন অনুমান করা
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">কেন Linear Regression শিখবেন?</h4>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-600">Machine Learning এর সবচেয়ে সহজ এবং মৌলিক algorithm</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-600">বাস্তব জীবনের অনেক সমস্যা সমাধানে ব্যবহার করা যায়</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-600">অন্যান্য জটিল algorithm বোঝার ভিত্তি তৈরি করে</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-600">Data analysis এ অত্যন্ত গুরুত্বপূর্ণ</span>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">মূল সূত্র</h4>
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-2xl font-mono mb-4">y = θ₀ + θ₁x</p>
          <div className="text-left max-w-md mx-auto">
            <p className="text-gray-600 mb-2"><strong>y</strong> = আমরা যা predict করতে চাই (output)</p>
            <p className="text-gray-600 mb-2"><strong>x</strong> = আমাদের input feature</p>
            <p className="text-gray-600 mb-2"><strong>θ₀</strong> = intercept (y-axis এ কোথায় শুরু)</p>
            <p className="text-gray-600"><strong>θ₁</strong> = slope (রেখার ঢাল)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicIntroduction;