@Library('github.com/bonitasoft/bonita-jenkins-library@master') _
node('bcd') {
    
    stage('git-checkout') {
        checkout scm
    }

    parallel 'deploy-bonita-server': {
        bcd args: 'stack create', ignore_errors: true
        bcd args: 'stack undeploy', ignore_errors: true
        bcd args: 'stack deploy'
    
    }, 'build-bonita-app': {
        bcd args: "livingapp build -p ${WORKSPACE} -e ${LIVINGAPP_ENVIRONMENT_NAME}"
    }

    def jobBaseName = "${env.JOB_NAME}".split('/').last()
    def artifacts_glob = "target/${jobBaseName}_*.zip"

    stage('deploy-bonita-app') {
        def zip_files = findFiles(glob: artifacts_glob)
        bcd args: "livingapp deploy -p ${WORKSPACE}/${zip_files[0].path}"
    }
    
    stage('archive-artifacts') {
        archiveArtifacts artifacts_glob
    }
    
}
