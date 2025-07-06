document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const promptOutput = document.getElementById('prompt-output');
    const notification = document.getElementById('notification');
    
    // Initialize Chart.js
    const ctx = document.getElementById('featureChart').getContext('2d');
    const featureChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['UI', 'DB', 'Sicurezza', 'Compatibilità', 'Avanzate'],
            datasets: [{
                label: 'Distribuzione Funzionalità',
                data: [3, 2, 4, 1, 2],
                backgroundColor: [
                    'rgba(67, 97, 238, 0.7)',
                    'rgba(114, 9, 183, 0.7)',
                    'rgba(247, 37, 133, 0.7)',
                    'rgba(76, 201, 240, 0.7)',
                    'rgba(106, 176, 76, 0.7)'
                ],
                borderColor: [
                    'rgba(67, 97, 238, 1)',
                    'rgba(114, 9, 183, 1)',
                    'rgba(247, 37, 133, 1)',
                    'rgba(76, 201, 240, 1)',
                    'rgba(106, 176, 76, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
    
    // Generate prompt
    generateBtn.addEventListener('click', function() {
        const pluginName = document.getElementById('plugin-name').value || 'Plugin WordPress Personalizzato';
        const pluginDesc = document.getElementById('plugin-desc').value || 'Un plugin WordPress ricco di funzionalità';
        const pluginVersion = document.getElementById('plugin-version').value || '1.0.0';
        const pluginAuthor = document.getElementById('plugin-author').value || 'Il Tuo Nome';
        const adminInterface = document.getElementById('admin-interface').options[document.getElementById('admin-interface').selectedIndex].text;
        const cssFramework = document.getElementById('css-framework').options[document.getElementById('css-framework').selectedIndex].text;
        const ajaxHandling = document.getElementById('ajax-handling').options[document.getElementById('ajax-handling').selectedIndex].text;
        const additionalNotes = document.getElementById('additional-notes').value;
        
        // Get selected frontend methods
        const frontendMethods = [];
        if (document.getElementById('shortcode').checked) frontendMethods.push('Shortcode');
        if (document.getElementById('widget').checked) frontendMethods.push('Widget');
        if (document.getElementById('block').checked) frontendMethods.push('Blocco Gutenberg');
        if (document.getElementById('template-tag').checked) frontendMethods.push('Tag Template');
        
        // Get database requirements
        const dbRequirements = [];
        if (document.getElementById('db-options').checked) dbRequirements.push('API Opzioni');
        if (document.getElementById('db-cpt').checked) dbRequirements.push('Tipi di Post Personalizzati');
        if (document.getElementById('db-taxonomies').checked) dbRequirements.push('Tassonomie Personalizzate');
        if (document.getElementById('db-custom-table').checked) dbRequirements.push('Tabelle Personalizzate');
        
        // Get security requirements
        const securityRequirements = [];
        if (document.getElementById('sec-nonce').checked) securityRequirements.push('Verifica Nonce');
        if (document.getElementById('sec-capabilities').checked) securityRequirements.push('Controlli Capacità');
        if (document.getElementById('sec-sanitization').checked) securityRequirements.push('Sanificazione Dati');
        if (document.getElementById('sec-esc').checked) securityRequirements.push('Escaping Output');
        
        // Get advanced features
        const advancedFeatures = [];
        if (document.getElementById('feat-cron').checked) advancedFeatures.push('Cron Jobs');
        if (document.getElementById('feat-export').checked) advancedFeatures.push('Esportazione Dati');
        if (document.getElementById('feat-import').checked) advancedFeatures.push('Importazione Dati');
        if (document.getElementById('feat-api').checked) advancedFeatures.push('Integrazione API Esterna');
        if (document.getElementById('feat-logging').checked) advancedFeatures.push('Registrazione Errori');
        if (document.getElementById('feat-multisite').checked) advancedFeatures.push('Supporto Multisito');
        
        // Get compatibility
        const compatibility = [];
        if (document.getElementById('comp-woo').checked) compatibility.push('WooCommerce');
        if (document.getElementById('comp-edd').checked) compatibility.push('Easy Digital Downloads');
        if (document.getElementById('comp-acf').checked) compatibility.push('Advanced Custom Fields');
        if (document.getElementById('comp-elementor').checked) compatibility.push('Elementor');
        
        // Build the prompt
        let prompt = `Sei un esperto sviluppatore di plugin WordPress. Per favore, genera il codice completo per un plugin WordPress altamente personalizzato basato sulle seguenti specifiche:\n\n`;
        prompt += `Nome Plugin: ${pluginName}\n`;
        prompt += `Descrizione: ${pluginDesc}\n`;
        prompt += `Versione: ${pluginVersion}\n`;
        prompt += `Autore: ${pluginAuthor}\n\n`;
        
        prompt += `INTERFACCIA ADMIN:\n`;
        prompt += `- Tipo: ${adminInterface}\n`;
        prompt += `- Framework CSS: ${cssFramework}\n\n`;
        
        prompt += `METODI DI VISUALIZZAZIONE FRONTEND:\n`;
        if (frontendMethods.length > 0) {
            prompt += `- ${frontendMethods.join('\n- ')}\n\n`;
        } else {
            prompt += `- Nessuno specificato\n\n`;
        }
        
        prompt += `REQUISITI DATABASE:\n`;
        if (dbRequirements.length > 0) {
            prompt += `- ${dbRequirements.join('\n- ')}\n\n`;
        } else {
            prompt += `- Nessuno specificato\n\n`;
        }
        
        prompt += `REQUISITI DI SICUREZZA:\n`;
        if (securityRequirements.length > 0) {
            prompt += `- ${securityRequirements.join('\n- ')}\n\n`;
        } else {
            prompt += `- Segui le migliori pratiche di sicurezza WordPress\n\n`;
        }
        
        prompt += `GESTIONE AJAX:\n`;
        prompt += `- Metodo: ${ajaxHandling}\n\n`;
        
        prompt += `FUNZIONALITÀ AVANZATE:\n`;
        if (advancedFeatures.length > 0) {
            prompt += `- ${advancedFeatures.join('\n- ')}\n\n`;
        } else {
            prompt += `- Nessuno specificato\n\n`;
        }
        
        prompt += `COMPATIBILITÀ:\n`;
        if (compatibility.length > 0) {
            prompt += `- Deve essere compatibile con: ${compatibility.join(', ')}\n\n`;
        } else {
            prompt += `- Compatibilità standard con WordPress\n\n`;
        }
        
        if (additionalNotes) {
            prompt += `NOTE AGGIUNTIVE & REQUISITI:\n`;
            prompt += `${additionalNotes}\n\n`;
        }
        
        prompt += `REQUISITI TECNICI:\n`;
        prompt += `- Segui gli standard di codifica WordPress\n`;
        prompt += `- Includi documentazione completa\n`;
        prompt += `- Garantisci compatibilità con l'ultima versione di WordPress\n`;
        prompt += `- Ottimizza per prestazioni e scalabilità\n`;
        prompt += `- Implementa una gestione adeguata degli errori\n`;
        prompt += `- Usa un approccio orientato agli oggetti\n\n`;
        
        prompt += `OUTPUT:\n`;
        prompt += `- Fornisci codice PHP completo e pronto per la produzione\n`;
        prompt += `- Includi tutti i file necessari (file principale del plugin, CSS, JS, ecc.)\n`;
        prompt += `- Aggiungi commenti dettagliati per le funzionalità chiave\n`;
        prompt += `- Includi documentazione per installazione e utilizzo\n`;
        
        promptOutput.textContent = prompt;
        
        // Update chart data
        featureChart.data.datasets[0].data = [
            frontendMethods.length,
            dbRequirements.length,
            securityRequirements.length,
            compatibility.length,
            advancedFeatures.length
        ];
        featureChart.update();
    });
    
    // Copy to clipboard
    copyBtn.addEventListener('click', function() {
        const textarea = document.createElement('textarea');
        textarea.value = promptOutput.textContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        // Show notification
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    });
    
    // Initialize with an example
    document.getElementById('plugin-name').value = 'Membership Manager Pro';
    document.getElementById('plugin-desc').value = 'Un sistema completo di gestione membri con livelli di abbonamento, restrizione contenuti e directory membri.';
    document.getElementById('plugin-version').value = '1.0.0';
    document.getElementById('plugin-author').value = 'WP Solutions Inc.';
    document.getElementById('additional-notes').value = 'Necessaria integrazione con PayPal e Stripe. La restrizione contenuti deve funzionare con qualsiasi tipo di post.';
});