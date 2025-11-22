document.addEventListener('DOMContentLoaded', function() {
    // Dados do gráfico de radar
    const emotions = ['Felicidade', 'Meio Termo', 'Tristeza'];
    const values = [60, 25, 15];
    const colors = {
        happiness: '#10b981',
        neutral: '#f59e0b',
        sadness: '#ef4444',
        background: 'rgba(99, 102, 241, 0.1)',
        grid: 'rgba(99, 102, 241, 0.2)',
        point: '#6366f1'
    };
    
    // Configuração do gráfico de radar
    const ctx = document.getElementById('emotionChart').getContext('2d');
    const emotionChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: emotions,
            datasets: [{
                label: 'Intensidade Emocional',
                data: values,
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: colors.point,
                pointBackgroundColor: colors.point,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: colors.point,
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            size: function(context) {
                                const chart = context.chart;
                                const width = chart.width;
                                return width < 500 ? 12 : 14;
                            }
                        },
                        color: function(context) {
                            const chart = context.chart;
                            const width = chart.width;
                            return width < 768 ? '#1e293b' : '#1e293b';
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 41, 59, 0.95)',
                    titleFont: {
                        size: 14,
                        family: 'Inter, sans-serif'
                    },
                    bodyFont: {
                        size: 13,
                        family: 'Inter, sans-serif'
                    },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed.r}%`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: colors.grid,
                        lineWidth: 1
                    },
                    grid: {
                        color: colors.grid,
                        circular: true
                    },
                    pointLabels: {
                        font: {
                            size: function(context) {
                                const chart = context.chart;
                                const width = chart.width;
                                return width < 500 ? 11 : 13;
                            },
                            family: 'Inter, sans-serif'
                        },
                        color: colors.point,
                        padding: 15
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: colors.point,
                        font: {
                            size: 10,
                            family: 'Inter, sans-serif'
                        },
                        stepSize: 20,
                        showLabelBackdrop: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    beginAtZero: true
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
            elements: {
                line: {
                    tension: 0.3
                }
            }
        }
    });

    // Função para otimizar o gráfico baseado no tamanho da tela
    function optimizeChart() {
        const width = window.innerWidth;
        
        // Ajustar tamanho da fonte dos labels baseado no tamanho da tela
        if (width < 768) {
            emotionChart.options.scales.r.pointLabels.font.size = 11;
        } else {
            emotionChart.options.scales.r.pointLabels.font.size = 13;
        }
        
        emotionChart.update();
    }

    // Otimizar ao carregar e redimensionar
    optimizeChart();
    window.addEventListener('resize', optimizeChart);

    // Adicionar interatividade aos cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px)';
            }, 150);
        });
    });

    // Animações de entrada suaves
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animações aos cards
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});