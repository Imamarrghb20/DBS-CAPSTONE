import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from scipy.stats import pearsonr

st.set_page_config(page_title="ALIVE Dashboard", layout="wide")
st.title("🧠 Stress & Wellness Dashboard")

uploaded_file = st.file_uploader("Choose CSV file", type="csv")

if uploaded_file is not None:
    df = pd.read_csv(uploaded_file, sep=';')
    st.success("✅ File loaded!")
    
    st.sidebar.title("🎯 Filters")
    
    if 'stress_level' in df.columns:
        stress_levels = df['stress_level'].unique()
        selected_stress = st.sidebar.multiselect("Stress Level", stress_levels, default=stress_levels)
        df = df[df['stress_level'].isin(selected_stress)]
    
    if 'gender' in df.columns:
        genders = df['gender'].unique()
        selected_gender = st.sidebar.multiselect("Gender", genders, default=genders)
        df = df[df['gender'].isin(selected_gender)]
    
    st.sidebar.markdown(f"**Total: {len(df)} records**")
    
    tab1, tab2, tab3, tab4 = st.tabs(["📊 Overview", "💤 Sleep", "🏋️ Lifestyle", "📈 Correlations"])
    
    with tab1:
        st.header("Overview")
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
                st.metric("Avg Activity", f"{df['physical_activity_level'].mean():.0f}%")
        
        st.markdown("---")
        
        col1, col2 = st.columns(2)
        with col1:
            if 'stress_level' in df.columns:
                st.subheader("Stress Distribution")
                stress_counts = df['stress_level'].value_counts()
                colors = {'Rendah': '#10b981', 'Ringan': '#f59e0b', 'Sedang': '#f97316', 'Tinggi': '#ef4444'}
                fig = px.pie(values=stress_counts.values, names=stress_counts.index, 
                            color=stress_counts.index, color_discrete_map=colors, hole=0.4)
                st.plotly_chart(fig, use_container_width=True)
        
        with col2:
            if 'daily_pressure' in df.columns and 'pss_total_score' in df.columns:
                st.subheader("Stress by Pressure")
                pressure_data = df.groupby('daily_pressure')['pss_total_score'].mean().sort_values(ascending=False)
                fig = px.bar(x=pressure_data.index, y=pressure_data.values, 
                            color=pressure_data.values, color_continuous_scale='RdYlGn_r')
                st.plotly_chart(fig, use_container_width=True)
    
    with tab2:
        st.header("Sleep & Stress")
        if 'quality_of_sleep' in df.columns and 'pss_total_score' in df.columns:
            fig = px.scatter(df, x='quality_of_sleep', y='pss_total_score',
                            color='stress_level' if 'stress_level' in df.columns else 'pss_total_score',
                            color_discrete_map={'Rendah': '#10b981', 'Ringan': '#f59e0b', 
                                              'Sedang': '#f97316', 'Tinggi': '#ef4444'} if 'stress_level' in df.columns else None,
                            labels={'quality_of_sleep': 'Sleep Quality', 'pss_total_score': 'Stress Score'})
            st.plotly_chart(fig, use_container_width=True)
    
    with tab3:
        st.header("Lifestyle Impact")
        col1, col2 = st.columns(2)
        with col1:
            if 'physical_activity_level' in df.columns and 'pss_total_score' in df.columns:
                st.subheader("Activity vs Stress")
                fig = px.scatter(df, x='physical_activity_level', y='pss_total_score',
                                color='pss_total_score', color_continuous_scale='Reds')
                st.plotly_chart(fig, use_container_width=True)
        with col2:
            if 'screen_time_hours' in df.columns and 'pss_total_score' in df.columns:
                st.subheader("Screen Time vs Stress")
                fig = px.scatter(df, x='screen_time_hours', y='pss_total_score',
                                color='pss_total_score', color_continuous_scale='Oranges')
                st.plotly_chart(fig, use_container_width=True)
    
    with tab4:
        st.header("Correlations")
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        if len(numeric_cols) > 1:
            corr_matrix = df[numeric_cols].corr()
            fig = go.Figure(data=go.Heatmap(z=corr_matrix.values, x=corr_matrix.columns,
                                           y=corr_matrix.columns, colorscale='RdBu', zmid=0,
                                           text=corr_matrix.values, texttemplate='%{text:.2f}'))
            st.plotly_chart(fig, use_container_width=True)
    
    st.markdown("---")
    csv = df.to_csv(index=False)
    st.download_button("📥 Download CSV", csv, "analysis.csv", "text/csv")

else:
    st.info("👈 Upload CSV to start!")
