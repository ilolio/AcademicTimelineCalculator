// URLパラメータから生年月日を取得
function getDateFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('birthdate');
}

// ページ読み込み時の処理
window.onload = function() {
    const birthdate = getDateFromURL();
    if (birthdate) {
        document.getElementById('birthdate').value = birthdate;
        calculateSchoolYears();
    }
}

function calculateSchoolYears() {
    const birthdateInput = document.getElementById('birthdate');
    const resultDiv = document.getElementById('result');
    
    if (!birthdateInput.value) {
        alert('生年月日を入力してください。');
        return;
    }

    const birthdate = new Date(birthdateInput.value);
    const today = new Date();
    
    // 年齢計算
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }

    // 入学年計算
    const birthYear = birthdate.getFullYear();
    const birthMonth = birthdate.getMonth() + 1;

    // 4月1日生まれまでを同じ学年とする
    const schoolStartYear = birthMonth <= 3 ? birthYear + 6 : birthYear + 7;

    // 各学校の入学・卒業年を計算
    const elementary = {
        start: schoolStartYear,
        end: schoolStartYear + 6
    };
    
    const juniorHigh = {
        start: elementary.end,
        end: elementary.end + 3
    };
    
    const highSchool = {
        start: juniorHigh.end,
        end: juniorHigh.end + 3
    };
    
    const university = {
        start: highSchool.end,
        end: highSchool.end + 4
    };
    
    const graduateSchool = {
        start: university.end,
        end: university.end + 2
    };
    
    const company = {
        start: graduateSchool.end,
        end: null
    };
    
    // 会社の継続年数を計算
    const companyYears = today.getFullYear() - company.start;
    const companyMonths = today.getMonth() - 3; // 4月入社を想定
    let companyDuration = companyYears;
    if (companyMonths < 0) {
        companyDuration--;
    }

    // 結果表示用のHTML生成
    let resultHTML = `
        <h3>計算結果</h3>
        <p>現在の年齢: ${age}歳</p>
        <h4>学校・職歴</h4>
        <ul>
            <li>小学校: ${elementary.start}年入学 - ${elementary.end}年卒業</li>
            <li>中学校: ${juniorHigh.start}年入学 - ${juniorHigh.end}年卒業</li>
            <li>高校: ${highSchool.start}年入学 - ${highSchool.end}年卒業</li>
            <li>大学: ${university.start}年入学 - ${university.end}年卒業</li>
            <li>大学院: ${graduateSchool.start}年入学 - ${graduateSchool.end}年卒業</li>
            <li>会社: ${company.start}年入社 (勤続${companyDuration + 1}年目)</li>
        </ul>
    `;

    resultDiv.innerHTML = resultHTML;
    resultDiv.classList.add('show');
}
