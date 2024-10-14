#!/bin/bash

while true; do
    if ! git remote | grep origin > /dev/null 2>&1; then
        echo "Kein Remote-Repository ist konfiguriert."
        read -p "Möchtest du das GitHub-Repository hinzufügen und den ersten Push durchführen? (j/n): " first_push
        if [[ "$first_push" == "j" ]]; then
            git remote set-url origin https://github.com/MikeOisCool/Timestamp-Microservice.git
            git branch -M main
            git add .
            git commit -m "Initial commit"
            git push -u origin main
            echo "Erster Commit und Push wurden erfolgreich durchgeführt."
            break  # Beende die Schleife nach dem ersten Push
        else
            echo "Erster Commit und Push wurden nicht durchgeführt."
            break  # Beende die Schleife, wenn der Benutzer 'n' wählt
        fi
    else
        read -p "Sollen die Änderungen zu GitHub gepusht werden? (j/n): " choice
        if [[ "$choice" == "j" ]]; then
            git add . 
            read -p "Möchtest du einen Commit schreiben? (j/n): " choiceCommit
            if [[ "$choiceCommit" == "j" ]]; then
                read -p "Wie soll er heißen? " commitNow
                git commit -m "$commitNow"
            else
                git commit -m "Auto-commit from Gitpod"
            fi
            git push
            echo "Änderungen wurden zu GitHub gepusht."
            # Hier könntest du entscheiden, ob du die Schleife fortsetzen möchtest
        else
            echo "Änderungen wurden nicht gepusht."
            break  # Beende die Schleife, wenn der Benutzer 'n' wählt
        fi
    fi
done
