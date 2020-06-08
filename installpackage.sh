#!/bin/bash
function init {
  echo "I will help you to install package that error with symlink!"
  echo "step: 0 what is your package do you want to install?"
  read -p "name (on npmjs.org): " package
  clear
}

step1 () {
  echo "step: 1 backup the folders"
  if [[ -f "../npminstaller_backup/"]]
  then
    rm -rf "../npminstaller_backup/"
    echo "----: removed old backup"
    mkdir "../npminstaller_backup/"
  else
    mkdir "../npminstaller_backup/"
  fi
  echo "----: start to backup"
  cp . ../npminstaller_backup/ -r
  echo "----: backuped!"
  step2
}

step2 () {
  echo "step: 2 start to move file"
  echo "step: 1 backup the folders"
  if [[ -f "~/npminstaller_execute/"]]
  then
    rm -rf "~/npminstaller_execute/"
    echo "----: removed old excute"
    mkdir "~/npminstaller_execute/"
  else
    mkdir "~/npminstaller_execute/"
  fi
  cp . ~/npminstaller_execute/ -r
  echo "----: start install npm package"
  npm i $package --prefix ~/npminstaller_execute/
  echo "----: finally!"
  step3
}

step3 () {
  echo "step: 3 save the data back to your folders"
  rm -rf .
  echo "----: all files before has been deleted, if you want it back try to check backup at ../npminstaller_backup/"
  cp ~/npminstaller_execute/ . -r
  echo "----: saved!!"
  step4
}

step4 () {
  echo "step: 4 cleaning before ending"
  echo "deleting executiing files"
  rm -rf ~/npminstaller_execute/
  echo "----: deleted executing files"
  read -p 'Did you want to DELETE THE BACKUP files? [y]es/[N]o: ' answer
  if [ i = "N"]
  then
    rm -rf ../npminstaller_backup/
    echo "----: REMOVED!"
  echo $package installed
}
