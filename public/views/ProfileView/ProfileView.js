// function profilePage (root) {
//     root.innerHTML = '';
//     navbar({ auth: true }, root);
//     const container = document.createElement('div');
//     container.innerHTML = renderProfileView({});
//     root.append(container);
//
//     // TODO read that element user choose instead of this idiot switch
//     // TODO make plug on server instead of plug here
//     // TODO make option to change user data (server request etc)
//     const choose = 1;
//     const mainBlock = document.getElementById('profile-main_block');
//     switch (choose) {
//     case 0: {
//         mainBlock.innerHTML = renderProfileUserdataView({});
//
//         const form = document.getElementById('profile-form-userdata');
//         form.addEventListener('submit', (evt) => {
//             evt.preventDefault();
//
//             const emailInput = document.getElementById('edit-login');
//             const passwordInput = document.getElementById('edit-password');
//
//             const email = emailInput.value.trim();
//             const password = passwordInput.value.trim();
//
//             ajaxPost({
//                     url: '/edit',
//                     body: { email, password }
//                 }
//             )
//                 .then(r => profilePage())
//                 .catch(r => console.log(`THis crash when post /edit from ${r}`));
//         });
//         break;
//     }
//     case 1: {
//         mainBlock.innerHTML = renderProfileOrdersView({
//             order: [
//                 'McDonalds',
//                 'KFC',
//                 'BurgerKing'
//             ]
//         });
//         break;
//     }
//     case 2: {
//         mainBlock.innerHTML = renderProfileChatsView({
//             chat: [
//                 'McDonalds',
//                 'KFC',
//                 'BurgerKing'
//             ]
//         });
//         break;
//     }
//     default: {
//         break;
//     }
//     }
//
//     root.append(container)
// }
