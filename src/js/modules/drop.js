import {postData} from "../services/requests";

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = "5px solid green";
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)";
    }

    function unHighlight(item) {
        item.closest('.file_upload').style.border = "none";
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else if (item.closest('.main')) {
            item.closest('.file_upload').style.backgroundColor = "#f7e7e6";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unHighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            if (input.closest('.main')) {
                postData(14124)
                    .then(res => {
                        console.log(res);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                input.files = e.dataTransfer.files;
            }

            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.'; // jshint ignore:line
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
        });
    });

    // fileInputs.forEach(input => {
    //     input.addEventListener('drop', (e) => {
    //         input.files = e.dataTransfer.files;
    //         let dots;
    //         const arr = input.files[0].name.split('.');
    //         arr[0].length > 6 ? dots = '...' : dots = '.'; // jshint ignore:line
    //         const name = arr[0].substring(0, 6) + dots + arr[1];
    //         input.previousElementSibling.textContent = name;
    //     });
    // });
};

export default drop;