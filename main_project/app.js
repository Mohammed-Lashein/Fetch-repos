let input = document.querySelector('input');
let btn = document.querySelector('.get-btn');
let dataContainer = document.querySelector('.show-data');

btn.onclick = getRepos;
/* A small but dangerous error : At first I wrote : 
btn.onclick = getRepos() . 

The code didn't work because getRepos had a parens after 
it and you should NOT add a parens . Remember that . */


function getRepos() {
    if (input.value === '') {
        dataContainer.innerHTML = `<span>Please enter \
        a github username</span>`;
    } else {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();
            req.onload = function() {
                if (this.readyState === 4 && this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject(Error('Data not found'));
                }
            }
            req.open('GET', `https://api.github.com/users/${input.value}/repos`);
            req.send();
        })
        .then((repos) => {
            dataContainer.innerHTML = '';
            repos.forEach((repo) => {
                let mainDiv = document.createElement('div');
                mainDiv.className = 'repo';

                mainDiv.append(repo.name);

                let controlsContainer = document.createElement('div');
                controlsContainer.className = 'controls';

                let starsCount = document.createElement('div');
                starsCount.className = 'stars-count';
                starsCount.textContent = `Stars: ${repo.stargazers_count}`;

                let repoLink = document.createElement('a');
                repoLink.className = 'visit-link';
                repoLink.href = `https://github.com/${input.value}/${repo.name}`;
                repoLink.target = '_blank';
                repoLink.textContent = 'Visit';

                controlsContainer.append(starsCount);
                controlsContainer.append(repoLink);

                mainDiv.append(controlsContainer);
                dataContainer.append(mainDiv);

            })
        });
    }
}