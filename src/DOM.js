import { doc } from 'prettier';
import { rootCertificates } from 'tls';

/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const tagEl = document.createElement(tag);
        const text = document.createTextNode(content);
        tagEl.appendChild(text);
        document.body.prepend(tagEl);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    function addDiv(count, deep) {
        let mainEl = document.createElement('div');
        mainEl.classList.add(`item_${deep}`);
        if (deep < level) {
            for (let i = 0; i < count; i++) {
                mainEl.appendChild(addDiv(childrenCount, deep + 1));
            }
        }
        return mainEl;
    }

    return addDiv(childrenCount, 1);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let tree = generateTree(2, 3);
    let branches = tree.childNodes;
    branches.forEach((element) => {
        if (element.className == 'item_2') {
            let section = document.createElement('section');
            section.classList.add('item_2');
            section.innerHTML = element.innerHTML;
            element.replaceWith(section);
        }
    });
    return tree;
}
