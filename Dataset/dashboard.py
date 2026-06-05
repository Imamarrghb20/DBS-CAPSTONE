import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from scipy.stats import pearsonr
import warnings
warnings.filterwarnings('ignore')

st.set_page_config(page_title="ALIVE Dashboard", layout="wide")

DARK_PURPLE = '#7c5ba8'
PURPLE = '#9333ea'
LIGHT_PURPLE = '#c084fc'
PINK = '#d946ef'

st.markdown(f"""
<div style='text-align:center; padding:20px; background:linear-gradient(135deg, #f5e6f7 0%, #ffe6f0 100%); border-radius:10px; margin-bottom:20px;'>
    <h1 style='color:{DARK_PURPLE}; margin:0;'>🧠 ALIVE Stress & Wellness Dashboard</h1>
    <p style='color:{PURPLE}; margin:5px 0 0 0;'>Upload CSV to analyze stress patterns</p>
</div>
""", unsafe_allow_html=True)

uploaded_file = st.file_uploader("📁 Upload CSV File", type="csv")

if uploaded_file is not None:
    try:
        df = pd.read_csv(uploaded_file, sep=';')
        st.success(f"✅ Loaded {len(df)} records successfully!")
        
        st.sidebar.markdown(f"<h3 style='color:{DARK_PURPLE};'>🎯 Filters</h3>", unsafe_allow_html=True)
        
        if 'stress_level' in df.columns:
            stress_levels = sorted(df['stress_level'].dropna().unique())
            selected_stress = st.sidebar.multiselect("Stress Level", stress_levels, default=stress_levels)
            df = df[df['stress_level'].isin(selected_stress)]
        
        if 'gender' in df.columns:
            genders = [x for x in df['gender'].dropna().unique() if pd.notna(x)]
            if genders:
                selected_gender = st.sidebar.multiselect("Gender", genders, default=genders)
                df = df[df['gender'].isin(selected_gender)]
        
        if 'daily_pressure' in df.columns:
            pressures = sorted([x for x in df['daily_pressure'].dropna().unique() if pd.notna(x)])
            if pressures:
                selected_pressure = st.sidebar.multiselect("Daily Pressure", pressures, default=pressures)
                df = df[df['daily_pressure'].isin(selected_pressure)]
        
        st.sidebar.markdown(f"<p style='color:{PURPLE}; font-weight:bold;'>📊 Records: {len(df)}</p>", unsafe_allow_html=True)
        
        tab1, tab2, tab3, tab4 = st.tabs(["📊 Overview", "💤 Sleep", "🏋️ Lifestyle", "📈 Correlations"])
        
        with tab1:
            st.markdown(f"<h2 style='color:{DARK_PURPLE};'>Dashboard Overview</h2>", unsafe_allow_html=True)
            
            col1, col2, col3, col4 = st.columns(4)
            with col1:
                st.metric("Total", len(df))
            if 'pss_total_score' in df.columns:
                with col2:
                    st.metric("Avg Stress", f"{df['pss_total_score'].mean():.1f}")
            if 'quality_of_sleep' in df.columns:
                with col3:
                    st.metric("Avg Sleep", f"{df['quality_of_sleep'].mean():.1f}")
            if 'physical_activity_level' in df.columns:
                with col4:
                    st.metric("Activity", f"{df['physical_activity_level'].mean():.0f}%")
            
            st.markdown("---")
            col1, col2 = st.columns(2)
            
            with col1:
                if 'stress_level' in df.columns:
                    st.markdown(f"<h3 style='color:{PURPLE};'>Stress Distribution</h3>", unsafe_allow_html=True)
                    stress_counts = df['stress_level'].value_counts()
                    colors = {'Rendah':'#a78bda', 'Ringan':'#c084fc', 'Sedang':'#d946ef', 'Tinggi':'#9333ea'}
                    fig = px.pie(values=stress_counts.values, names=stress_counts.index, color=stress_counts.index, color_discrete_map=colors, hole=0.4)
                    fig.update_layout(paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)', font=dict(color=DARK_PURPLE, size=12))
                    fig.update_traces(marker=dict(line=dict(color='white', width=2)))
                    st.plotly_chart(fig, use_container_width=True)
            
            with col2:
                if 'daily_pressure' in df.columns and 'pss_total_score' in df.columns:
                    st.markdown(f"<h3 style='color:{PURPLE};'>Stress by Pressure</h3>", unsafe_allow_html=True)
                    pressure_data = df.groupby('daily_pressure')['pss_total_score'].mean().sort_values(ascending=False)
                    fig = px.bar(x=pressure_data.index, y=pressure_data.values, color=pressure_data.values, color_continuous_scale='Purples')
                    fig.update_layout(paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)', font=dict(color=DARK_PURPLE), coloraxis_colorbar=dict(tickfont=dict(color=DARK_PURPLE)))
                    fig.update_traces(marker=dict(line=dict(color='white', width=2)))
                    st.plotly_chart(fig, use_container_width=True)
        
        with tab2:
            st.markdown(f"<h2 style='color:{DARK_PURPLE};'>Sleep & Stress Analysis</h2>", unsafe_allow_html=True)
            
            if 'quality_of_sleep' in df.columns and 'pss_total_score' in df.columns:
                col1, col2 = st.columns([2, 1])
                
                with col1:
                    st.markdown(f"<h3 style='color:{PURPLE};'>Sleep vs Stress</h3>", unsafe_allow_html=True)
                    fig = px.scatter(df, x='quality_of_sleep', y='pss_total_score', color='stress_level' if 'stress_level' in df.columns else 'pss_total_score', color_discrete_map={'Rendah':'#a78bda','Ringan':'#c084fc','Sedang':'#d946ef','Tinggi':'#9333ea'} if 'stress_level' in df.columns else None, color_continuous_scale='Purples' if 'stress_level' not in df.columns else None, labels={'quality_of_sleep':'Sleep Quality','pss_total_score':'Stress Score'})
                    z = np.polyfit(df['quality_of_sleep'].dropna(), df.loc[df['quality_of_sleep'].notna(),'pss_total_score'], 1)
                    p = np.poly1d(z)
                    x_line = np.linspace(df['quality_of_sleep'].min(), df['quality_of_sleep'].max(), 100)
                    fig.add_trace(go.Scatter(x=x_line, y=p(x_line), mode='lines', name='Trend', line=dict(color=PINK, width=3, dash='dash')))
                    fig.update_layout(paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)', font=dict(color=DARK_PURPLE))
                    st.plotly_chart(fig, use_container_width=True)
                
                with col2:
                    st.markdown(f"<h3 style='color:{PURPLE};'>Insights</h3>", unsafe_allow_html=True)
                    try:
                        corr, p_val = pearsonr(df['quality_of_sleep'].dropna(), df.loc[df['quality_of_sleep'].notna(),'pss_total_score'])
                        st.metric("Correlation", f"{corr:.3f}")
                        st.caption(f"p-value: {p_val:.4f}")
                    except:
                        st.caption("Not enough data")
                    st.markdown("---")
                    at_risk = len(df[(df['quality_of_sleep'] < 6) & (df['pss_total_score'] > 26)])
                    st.metric("At Risk", f"{at_risk}")
        
        with tab3:
            st.markdown(f"<h2 style='color:{DARK_PURPLE};'>Lifestyle Impact</h2>", unsafe_allow_html=True)
            col1, col2 = st.columns(2)
            
            with col1:
                if 'physical_activity_level' in df.columns and 'pss_total_score' in df.columns:
                    st.markdown(f"<h3 style='color:{PURPLE};'>Activity Impact</h3>", unsafe_allow_html=True)
                    fig = px.scatter(df, x='physical_activity_level', y='pss_total_score', color='pss_total_score', color_continuous_scale='Purples', labels={'physical_activity_level':'Activity %','pss_total_score':'Stress Score'})
                    fig.update_layout(paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)', font=dict(color=DARK_PURPLE))
                    st.plotly_chart(fig, use_container_width=True)
            
            with col2:
                if 'screen_time_hours' in df.columns and 'pss_total_score' in df.columns:
                    st.markdown(f"<h3 style='color:{PURPLE};'>Screen Time Impact</h3>", unsafe_allow_html=True)
                    fig = px.scatter(df, x='screen_time_hours', y='pss_total_score', color='pss_total_score', color_continuous_scale='RdPu', labels={'screen_time_hours':'Screen Time (hours)','pss_total_score':'Stress Score'})
                    fig.update_layout(paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)', font=dict(color=DARK_PURPLE))
                    st.plotly_chart(fig, use_container_width=True)
        
        with tab4:
            st.markdown(f"<h2 style='color:{DARK_PURPLE};'>Correlations</h2>", unsafe_allow_html=True)
            numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
            
            if len(numeric_cols) > 1:
                corr_matrix = df[numeric_cols].corr()
                st.markdown(f"<h3 style='color:{PURPLE};'>Correlation Heatmap</h3>", unsafe_allow_html=True)
                fig = go.Figure(data=go.Heatmap(z=corr_matrix.values, x=corr_matrix.columns, y=corr_matrix.columns, colorscale='RdPu', zmid=0, text=corr_matrix.values, texttemplate='%{text:.2f}'))
                fig.update_layout(paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)', font=dict(color=DARK_PURPLE), height=500)
                st.plotly_chart(fig, use_container_width=True)
        
        st.markdown("---")
        col1, col2 = st.columns(2)
        with col1:
            csv = df.to_csv(index=False)
            st.download_button("📥 Download CSV", csv, "analysis.csv", "text/csv")
        with col2:
            json_data = df.to_json(orient='records')
            st.download_button("🔗 Download JSON", json_data, "analysis.json", "application/json")
    
    except Exception as e:
        st.error(f"❌ Error: {str(e)}")

else:
    st.info("👈 Upload a CSV file to start analyzing!")
