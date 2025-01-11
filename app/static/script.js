// قائمة العناصر (تبدأ فارغة، ويمكن للمستخدم إضافة عناصر جديدة)
const items = [];

// عند تحميل الصفحة، تحديث واجهة العناصر
document.addEventListener('DOMContentLoaded', () => {
    const itemsList = document.getElementById('itemsList');
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `العنصر ${item.name}: الوزن = ${item.weight} كغ، القيمة = ${item.value} ليرة`;
        itemsList.appendChild(li);
    });
});

// دالة لإضافة عنصر جديد
function addItem() {
    const name = document.getElementById('itemName').value;
    const weight = parseInt(document.getElementById('itemWeight').value);
    const value = parseInt(document.getElementById('itemValue').value);

    if (name && weight > 0 && value > 0) {
        // إضافة العنصر إلى القائمة
        items.push({ name, weight, value });

        // تحديث واجهة المستخدم
        const li = document.createElement('li');
        li.textContent = `العنصر ${name}: الوزن = ${weight} كغ، القيمة = ${value} ليرة`;
        document.getElementById('itemsList').appendChild(li);

        // تفريغ الحقول بعد الإضافة
        document.getElementById('itemName').value = '';
        document.getElementById('itemWeight').value = '';
        document.getElementById('itemValue').value = '';
    } else {
        alert('يرجى إدخال جميع القيم بشكل صحيح.');
    }
}

// دالة لحل مشكلة الحقيبة وإرسال البيانات إلى الخادم
function solveKnapsack() {
    const maxWeight = parseInt(document.getElementById('maxWeight').value);

    if (isNaN(maxWeight) || maxWeight <= 0) {
        alert('يرجى إدخال وزن أقصى صحيح.');
        return;
    }

    // إرسال البيانات إلى الخادم عبر المسار /solve
    fetch('/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maxWeight, items })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // تحديث واجهة النتيجة
        document.getElementById('solution').textContent = `العناصر: ${data.items.join(', ')}, القيمة القصوى: ${data.value}`;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('حدث خطأ أثناء حل المشكلة.');
    });
}
