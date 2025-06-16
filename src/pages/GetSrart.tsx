import React from "react";
import Key from "../components/Key";
import { useAchievementContext } from "../lib/data/useAchievementData";

export default function GetSrart() {
  const { setCurrentProgress, setCurrentPage , getCurrentProgress} = useAchievementContext();

  return (
    <>
      <div className="flex justify-center items-center flex-col text-block">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text drop-shadow-sm ">
          スキル覚醒！フロントエンド道
        </h1>
        <p className="text-lg mt-2 text-gray-700 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text drop-shadow-sm ">
          技能覺醒！前端開發之道！
        </p>
      </div>
      <hr className="my-4 border-t border-gray-300" />
      <div>
        <p className="mb-2">
          　　這個網站整理了前端開發的技能路線，你可以跟著下面的章節，從 HTML
          零基礎開始學習，然後逐步深入到 JavaScript、CSS、React、Node.js
          等等。這些技能都是前端開發中非常重要的基礎知識，掌握了這些技能，你就可以開始進行前端開發了。
        </p>
        <p className="mb-2">
          　　在開始前，你需要具備一些基本的電腦操作技能，比如如何使用瀏覽器、如何下載和安裝軟體等等。這些技能都是前端開發的基礎，掌握了這些技能，你就可以開始學習前端開發了。
        </p>
        <p className="mb-2">
          　　在這邊提供你一些可以用的資源和參考資料，你需要自行閱讀。有時候是網路文章、影片、或是一些
          google
          搜尋的關鍵字。僅提供一個學習的路線。給無從下手的初心者下手的路徑。
        </p>
        <p className="mb-2">
          　　我還沒有製作關卡的驗收，進度是否通關由你自己決定。進度通關後你可以蒐集鍵盤按鍵
          <Key />
          ，在某些比較困難的關卡中，你可以使用消耗按鍵
          <Key />
          獲得提示。
        </p>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        onClick={() => {
          console.log("setCurrentProgress", getCurrentProgress());
          setCurrentProgress("1:0");
          
          setCurrentPage(1);
          
          console.log("setCurrentProgress", getCurrentProgress());
          
        }}
      >
        現在開始
      </button>
    </>
  );
}
