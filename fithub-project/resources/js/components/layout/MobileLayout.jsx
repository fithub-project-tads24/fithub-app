import React from 'react';

const MobileLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Mobile Device Frame */}
      <div className="relative">
        {/* Phone Frame */}
        <div className="w-[375px] h-[812px] bg-black rounded-[50px] p-2 shadow-2xl">
          {/* Screen */}
          <div className="w-full h-full bg-white rounded-[42px] overflow-hidden relative">
            {/* Status Bar */}
            <div className="h-12 bg-white flex items-center justify-between px-6 text-black text-sm font-medium">
              <div className="flex items-center gap-1">
                <span>9:41</span>
              </div>
              <div className="flex items-center gap-1">
                {/* Signal bars */}
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                  <div className="w-1 h-2 bg-black rounded-full"></div>
                  <div className="w-1 h-3 bg-black rounded-full"></div>
                  <div className="w-1 h-4 bg-black rounded-full"></div>
                </div>
                {/* WiFi */}
                <div className="w-4 h-3 relative ml-1">
                  <div className="absolute inset-0">
                    <svg viewBox="0 0 16 12" className="w-full h-full fill-black">
                      <path d="M8 3.5c-1.25 0-2.4.4-3.3 1.1L3.5 3.4C4.8 2.5 6.3 2 8 2s3.2.5 4.5 1.4L11.3 4.6C10.4 3.9 9.25 3.5 8 3.5z"/>
                      <path d="M8 6.5c-.7 0-1.3.2-1.8.6L5.5 6.4C6.2 5.9 7.1 5.5 8 5.5s1.8.4 2.5.9L9.8 7.1C9.3 6.7 8.7 6.5 8 6.5z"/>
                      <circle cx="8" cy="9.5" r="1.5"/>
                    </svg>
                  </div>
                </div>
                {/* Battery */}
                <div className="w-6 h-3 border border-black rounded-sm relative ml-1">
                  <div className="absolute inset-0.5 bg-green-500 rounded-sm"></div>
                  <div className="absolute -right-0.5 top-1 w-0.5 h-1 bg-black rounded-r-sm"></div>
                </div>
              </div>
            </div>

            {/* App Content */}
            <div className="flex-1 h-[calc(100%-3rem)] overflow-auto">
              {children}
            </div>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-1 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
