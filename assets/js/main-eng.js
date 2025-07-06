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
            labels: ['UI', 'DB', 'Security', 'Compatibility', 'Advanced'],
            datasets: [{
                label: 'Feature Distribution',
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
        const pluginName = document.getElementById('plugin-name').value || 'Custom WordPress Plugin';
        const pluginDesc = document.getElementById('plugin-desc').value || 'A feature-rich WordPress plugin';
        const pluginVersion = document.getElementById('plugin-version').value || '1.0.0';
        const pluginAuthor = document.getElementById('plugin-author').value || 'Your Name';
        const adminInterface = document.getElementById('admin-interface').options[document.getElementById('admin-interface').selectedIndex].text;
        const cssFramework = document.getElementById('css-framework').options[document.getElementById('css-framework').selectedIndex].text;
        const ajaxHandling = document.getElementById('ajax-handling').options[document.getElementById('ajax-handling').selectedIndex].text;
        const additionalNotes = document.getElementById('additional-notes').value;
        
        // Get selected frontend methods
        const frontendMethods = [];
        if (document.getElementById('shortcode').checked) frontendMethods.push('Shortcode');
        if (document.getElementById('widget').checked) frontendMethods.push('Widget');
        if (document.getElementById('block').checked) frontendMethods.push('Gutenberg Block');
        if (document.getElementById('template-tag').checked) frontendMethods.push('Template Tag');
        
        // Get database requirements
        const dbRequirements = [];
        if (document.getElementById('db-options').checked) dbRequirements.push('Options API');
        if (document.getElementById('db-cpt').checked) dbRequirements.push('Custom Post Types');
        if (document.getElementById('db-taxonomies').checked) dbRequirements.push('Custom Taxonomies');
        if (document.getElementById('db-custom-table').checked) dbRequirements.push('Custom Tables');
        
        // Get security requirements
        const securityRequirements = [];
        if (document.getElementById('sec-nonce').checked) securityRequirements.push('Nonce Verification');
        if (document.getElementById('sec-capabilities').checked) securityRequirements.push('Capability Checks');
        if (document.getElementById('sec-sanitization').checked) securityRequirements.push('Data Sanitization');
        if (document.getElementById('sec-esc').checked) securityRequirements.push('Output Escaping');
        
        // Get advanced features
        const advancedFeatures = [];
        if (document.getElementById('feat-cron').checked) advancedFeatures.push('Cron Jobs');
        if (document.getElementById('feat-export').checked) advancedFeatures.push('Data Export');
        if (document.getElementById('feat-import').checked) advancedFeatures.push('Data Import');
        if (document.getElementById('feat-api').checked) advancedFeatures.push('External API Integration');
        if (document.getElementById('feat-logging').checked) advancedFeatures.push('Error Logging');
        if (document.getElementById('feat-multisite').checked) advancedFeatures.push('Multisite Support');
        
        // Get compatibility
        const compatibility = [];
        if (document.getElementById('comp-woo').checked) compatibility.push('WooCommerce');
        if (document.getElementById('comp-edd').checked) compatibility.push('Easy Digital Downloads');
        if (document.getElementById('comp-acf').checked) compatibility.push('Advanced Custom Fields');
        if (document.getElementById('comp-elementor').checked) compatibility.push('Elementor');
        
        // Build the prompt
        let prompt = `You are an expert WordPress plugin developer. Please generate the complete code for a highly-customized WordPress plugin based on the following specifications:\n\n`;
        prompt += `Plugin Name: ${pluginName}\n`;
        prompt += `Description: ${pluginDesc}\n`;
        prompt += `Version: ${pluginVersion}\n`;
        prompt += `Author: ${pluginAuthor}\n\n`;
        
        prompt += `ADMIN INTERFACE:\n`;
        prompt += `- Type: ${adminInterface}\n`;
        prompt += `- CSS Framework: ${cssFramework}\n\n`;
        
        prompt += `FRONTEND DISPLAY METHODS:\n`;
        if (frontendMethods.length > 0) {
            prompt += `- ${frontendMethods.join('\n- ')}\n\n`;
        } else {
            prompt += `- None specified\n\n`;
        }
        
        prompt += `DATABASE REQUIREMENTS:\n`;
        if (dbRequirements.length > 0) {
            prompt += `- ${dbRequirements.join('\n- ')}\n\n`;
        } else {
            prompt += `- None specified\n\n`;
        }
        
        prompt += `SECURITY REQUIREMENTS:\n`;
        if (securityRequirements.length > 0) {
            prompt += `- ${securityRequirements.join('\n- ')}\\n\n`;
        } else {
            prompt += `- Follow WordPress security best practices\n\n`;
        }
        
        prompt += `AJAX HANDLING:\n`;
        prompt += `- Method: ${ajaxHandling}\n\n`;
        
        prompt += `ADVANCED FEATURES:\n`;
        if (advancedFeatures.length > 0) {
            prompt += `- ${advancedFeatures.join('\n- ')}\n\n`;
        } else {
            prompt += `- None specified\n\n`;
        }
        
        prompt += `COMPATIBILITY:\n`;
        if (compatibility.length > 0) {
            prompt += `- Should be compatible with: ${compatibility.join(', ')}\n\n`;
        } else {
            prompt += `- Standard WordPress compatibility\n\n`;
        }
        
        if (additionalNotes) {
            prompt += `ADDITIONAL NOTES & REQUIREMENTS:\n`;
            prompt += `${additionalNotes}\n\n`;
        }
        
        prompt += `TECHNICAL REQUIREMENTS:\n`;
        prompt += `- Follow WordPress coding standards\n`;
        prompt += `- Include comprehensive documentation\n`;
        prompt += `- Ensure compatibility with latest WordPress version\n`;
        prompt += `- Optimize for performance and scalability\n`;
        prompt += `- Implement proper error handling\n`;
        prompt += `- Use object-oriented programming approach\n\n`;
        
        prompt += `OUTPUT:\n`;
        prompt += `- Provide complete, production-ready PHP code\n`;
        prompt += `- Include all necessary files (main plugin file, CSS, JS, etc.)\n`;
        prompt += `- Add detailed comments for key functionality\n`;
        prompt += `- Include installation and usage documentation\n`;
        
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
    document.getElementById('plugin-desc').value = 'A comprehensive membership management system with subscription levels, content restriction, and member directories.';
    document.getElementById('plugin-version').value = '1.0.0';
    document.getElementById('plugin-author').value = 'WP Solutions Inc.';
    document.getElementById('additional-notes').value = 'Need integration with PayPal and Stripe. Content restriction should work with any post type.';
});