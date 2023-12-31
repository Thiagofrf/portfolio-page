import { Octokit } from 'https://esm.sh/@octokit/core';
import myToken from './config.js';

const octokit = new Octokit({
    auth: myToken
})

const headers = {
    'X-GitHub-Api-Version': '2022-11-28'
};

await octokit.request("GET /user/repos", {
        per_page: 4,
        sort: 'created',
        headers: headers
    })
.then((response) => {
    const projectsParent = document.querySelector('.projects-resume')
    const { data } = response

    data.forEach(function (item) {
        let name = item.name;
        let projectUrl = item.svn_url;
        let description = item.description;
        let starCount = item.stargazers_count;
        let forksCount = item.forks_count;
        let language = item.language;

        let productResume = `
            <a href=${projectUrl} target="_blank" class="project-resume">
                <p class="project-resume-title"><ion-icon name="folder-outline"></ion-icon>${name}</p>
                <p class="project-resume-description">${description}</p>
                <div class="project-resume-footer">
                    <p class="project-resume-stars"><ion-icon name="star-outline"></ion-icon>${starCount}</p>
                    <p class="project-resume-pr"><ion-icon name="git-branch-outline"></ion-icon>${forksCount}</p>
                    <p class="project-resume-language">${language}</p>
                </div>
            </a>
        `

        projectsParent.insertAdjacentHTML(
            'beforeend', 
            productResume
        )
    })
})