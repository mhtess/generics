---
title: "cogsci15-generics"
author: "mht"
date: "February 3, 2015"
output: html_document
---


```r
discretize_beta<- function(gamma,delta,bins = c(0.01,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,0.99)) {
  s_alpha<- gamma*delta
  s_beta <- (1 - gamma) * delta
  beta_pdf<- function(x){
    return((x^(s_alpha-1))*((1-x)^(s_beta-1)))
  }
  return(sapply(bins,beta_pdf))
}



bool.tonum<-function(bool){abs(as.numeric(bool)*1-2)}

bootstrap.ci.ip <- function(x){
  agr = aggregate(imp_subj ~ context, data=x, FUN=mean)
  agr$CILow = aggregate(imp_subj ~ context, data=x, FUN=ci.low)$imp_subj
  agr$CIHigh = aggregate(imp_subj ~ context, data=x, FUN=ci.high)$imp_subj
  agr$YMin = agr$imp_subj - agr$CILow
  agr$YMax = agr$imp_subj + agr$CIHigh
  return(agr)
}

bootstrap.ci.tc <- function(x){
  
  agr = aggregate(truth_num ~ stim_prevalence + stim_determiner + stim_type, data=x, FUN=mean)
  agr$CILow = aggregate(truth_num ~ stim_prevalence + stim_determiner + stim_type, data=x, FUN=ci.low)$truth_num
  agr$CIHigh = aggregate(truth_num ~ stim_prevalence + stim_determiner + stim_type, data=x, FUN=ci.high)$truth_num
  agr$YMin = agr$truth_num - agr$CILow
  agr$YMax = agr$truth_num + agr$CIHigh
  return(agr)
}

bootstrap.ci.prior <- function(x){
  agr = aggregate(value ~ context, data=x, FUN=mean)
  agr$CILow = aggregate(value ~ context, data=x, FUN=ci.low)$value
  agr$CIHigh = aggregate(value ~ context, data=x, FUN=ci.high)$value
  agr$YMin = agr$value - agr$CILow
  agr$YMax = agr$value + agr$CIHigh
  return(agr)
}


g_legend<-function(a.gplot){
  tmp <- ggplot_gtable(ggplot_build(a.gplot))
  leg <- which(sapply(tmp$grobs, function(x) x$name) == "guide-box")
  legend <- tmp$grobs[[leg]]
  return(legend)}


simulate_subject<- function(dstats){
  prevlev<-c(10,10,30,30,50,50,70,70,90,90)
  dd.resp = c(rbinom(2,1,dstats[1,"mean"]),
             rbinom(2,1,dstats[2,"mean"]),
              rbinom(2,1,dstats[3,"mean"]),
              rbinom(2,1,dstats[4,"mean"]),
              rbinom(2,1,dstats[5,"mean"]))
  dd.ave <- sum(dd.resp*prevlev)/sum(dd.resp)
  
  ni.resp = c(rbinom(2,1,dstats[6,"mean"]),
             rbinom(2,1,dstats[7,"mean"]),
              rbinom(2,1,dstats[8,"mean"]),
              rbinom(2,1,dstats[9,"mean"]),
              rbinom(2,1,dstats[10,"mean"]))
  ni.ave <- sum(ni.resp*prevlev)/sum(ni.resp)
  
  pl.resp = c(rbinom(2,1,dstats[11,"mean"]),
             rbinom(2,1,dstats[12,"mean"]),
              rbinom(2,1,dstats[13,"mean"]),
              rbinom(2,1,dstats[14,"mean"]),
              rbinom(2,1,dstats[15,"mean"]))
  pl.ave <- sum(pl.resp*prevlev)/sum(pl.resp)
  return(c(dd.ave,ni.ave,pl.ave))
}

# for truth_conditions --> average_prevalence transform
# if subject says "False" to everything, her average prevalence = 100
# else, it is the mean of the the things she said "True" to
check.zero <- function(prev,val){
  if (sum(val)==0){
    v = 100
  } else {
    v = sum(prev*val)/sum(val)
  }
  return(v)
}
```

# Experiment 1: CBG Replication


## 1a stats


```r
setwd("~/Documents/research/generics/cbg2010-replication/data")
d<-read.table('cbgR-exp9-trials.tsv',header=T)

d$item <- paste(d$stim_color,d$stim_part,sep="_")
d$rt <- d$rt/1000
d$truth_conditions <- factor(as.logical(levels(d$response)[d$response]), 
                              levels=c("TRUE","FALSE"))
d$truth_num <- bool.tonum(d$truth_conditions)
d$prev_centered <- scale(d$stim_prevalence, scale=F)

#contrasts(d$stim_type) = cbind(quad = c(-1,2,-1), lin = c(-1, 0, 1))
#contrasts(d$stim_type) = cbind(dd = c(0,1,0), ni = c(0, 0, 1))

rs<-glmer(truth_num ~ prev_centered*stim_type + 
            (1 | workerid) + 
            (1 | item), 
          data=d, family = 'binomial')

summary(rs)
```

```
## Generalized linear mixed model fit by maximum likelihood (Laplace
##   Approximation) [glmerMod]
##  Family: binomial  ( logit )
## Formula: truth_num ~ prev_centered * stim_type + (1 | workerid) + (1 |  
##     item)
##    Data: d
## 
##      AIC      BIC   logLik deviance df.resid 
##    617.5    658.2   -300.8    601.5     1192 
## 
## Scaled residuals: 
##    Min     1Q Median     3Q    Max 
## -6.781 -0.018  0.036  0.188  4.655 
## 
## Random effects:
##  Groups   Name        Variance Std.Dev.
##  workerid (Intercept) 18.4783  4.30    
##  item     (Intercept)  0.0786  0.28    
## Number of obs: 1200, groups:  workerid, 40; item, 30
## 
## Fixed effects:
##                                        Estimate Std. Error z value
## (Intercept)                              3.3438     0.8160    4.10
## prev_centered                            0.1030     0.0107    9.62
## stim_typedanger-distinct                 1.9924     0.3610    5.52
## stim_typenondistinctive                 -0.5709     0.2990   -1.91
## prev_centered:stim_typedanger-distinct  -0.0306     0.0130   -2.35
## prev_centered:stim_typenondistinctive   -0.0189     0.0120   -1.57
##                                        Pr(>|z|)    
## (Intercept)                             4.2e-05 ***
## prev_centered                           < 2e-16 ***
## stim_typedanger-distinct                3.4e-08 ***
## stim_typenondistinctive                   0.056 .  
## prev_centered:stim_typedanger-distinct    0.019 *  
## prev_centered:stim_typenondistinctive     0.115    
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Correlation of Fixed Effects:
##             (Intr) prv_cn stm_t- stm_ty pr_:_-
## prev_centrd  0.239                            
## stm_typdng- -0.079  0.047                     
## stm_typnnds -0.217 -0.261  0.422              
## prv_cntr:_- -0.135 -0.642  0.331  0.173       
## prv_cntrd:_ -0.102 -0.646  0.112  0.271  0.493
```

## 1b stats


```r
setwd("~/Documents/research/generics/cbg2010-replication/data/")
f<-read.table('cbgR-exp12-trials.tsv',header=T)
f$item <- paste(f$stim_color,f$stim_part,sep="_")
table(f$stim_type,f$item)
```

```
##                  
##                   blue_ears blue_scales blue_teeth copper_fur copper_spots
##   bare                    8          11         11         10           11
##   danger-distinct        12           7          9          6            9
##   nondistinctive         10          12         10         14           10
##                  
##                   copper_stripes gold_feathers gold_spots gold_stripes
##   bare                        11            10         15           14
##   danger-distinct              9             8          9            9
##   nondistinctive              10            12          6            7
##                  
##                   green_shells green_tails green_teeth orange_ears
##   bare                      12           9          12          11
##   danger-distinct            9           8           9          12
##   nondistinctive             9          13           9           7
##                  
##                   orange_shells orange_tails pink_ears pink_legs
##   bare                        7           10        11        13
##   danger-distinct            10           12         6         5
##   nondistinctive             13            8        13        12
##                  
##                   pink_teeth purple_feathers purple_shells purple_tails
##   bare                     7               9            11           11
##   danger-distinct         12              11            11           10
##   nondistinctive          11              10             8            9
##                  
##                   red_feathers red_scales red_spots silver_fur silver_legs
##   bare                      11          8         4         13           9
##   danger-distinct           11          9        12         10          11
##   nondistinctive             8         13        14          7          10
##                  
##                   silver_stripes yellow_fur yellow_legs yellow_scales
##   bare                         5          7           8            11
##   danger-distinct             12         14          14            14
##   nondistinctive              13          9           8             5
```

```r
table(f$stim_type,f$stim_part)
```

```
##                  
##                   ears feathers fur legs scales shells spots stripes tails
##   bare              30       30  30   30     30     30    30      30    30
##   danger-distinct   30       30  30   30     30     30    30      30    30
##   nondistinctive    30       30  30   30     30     30    30      30    30
##                  
##                   teeth
##   bare               30
##   danger-distinct    30
##   nondistinctive     30
```

```r
f.tidy <- f %>%
  select(workerid,rt,stim_type,response)%>%
  rename(context=stim_type)

f.stats<-ddply(f.tidy, 
       .(workerid,context), summarise, 
       imp_subj = mean(response),
       context=context[1])
f.stats$task<-'implied'


d.tidy <- d %>%
  select(workerid,rt,stim_type,stim_prevalence,truth_num)%>%
  rename(context=stim_type,
         prevalence=stim_prevalence,
         response=truth_num)

d.stats<-ddply(d.tidy,
      .(workerid,context), summarise,
      imp_subj = sum(prevalence*response)/sum(response),
      context=context[1])
d.stats$workerid <- d.stats$workerid+30
d.stats$task<-'truth'


both.stats<-rbind(f.stats,d.stats)
contrasts(both.stats$context)
```

```
##                 danger-distinct nondistinctive
## bare                          0              0
## danger-distinct               1              0
## nondistinctive                0              1
```

```r
both.stats$task<-factor(both.stats$task)
contrasts(both.stats$task)
```

```
##         truth
## implied     0
## truth       1
```

```r
rs<-lmer(imp_subj ~ context * task + (1 | workerid), data=both.stats)
summary(rs)
```

```
## Linear mixed model fit by REML t-tests use Satterthwaite approximations
##   to degrees of freedom [merModLmerTest]
## Formula: imp_subj ~ context * task + (1 | workerid)
##    Data: both.stats
## 
## REML criterion at convergence: 1630
## 
## Scaled residuals: 
##    Min     1Q Median     3Q    Max 
## -4.400 -0.372  0.103  0.364  2.382 
## 
## Random effects:
##  Groups   Name        Variance Std.Dev.
##  workerid (Intercept) 217      14.7    
##  Residual             100      10.0    
## Number of obs: 204, groups:  workerid, 70
## 
## Fixed effects:
##                                  Estimate Std. Error     df t value
## (Intercept)                         90.47       3.25 103.20   27.80
## contextdanger-distinct              -2.74       2.58 129.70   -1.06
## contextnondistinctive               -3.64       2.58 129.70   -1.41
## tasktruth                          -28.81       4.34 105.80   -6.63
## contextdanger-distinct:tasktruth    -2.96       3.47 130.90   -0.85
## contextnondistinctive:tasktruth      5.43       3.48 129.70    1.56
##                                  Pr(>|t|)    
## (Intercept)                       < 2e-16 ***
## contextdanger-distinct               0.29    
## contextnondistinctive                0.16    
## tasktruth                         1.4e-09 ***
## contextdanger-distinct:tasktruth     0.40    
## contextnondistinctive:tasktruth      0.12    
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Correlation of Fixed Effects:
##             (Intr) cntxt- cntxtn tsktrt cntx-:
## cntxtdngr-d -0.397                            
## cntxtnndstn -0.397  0.500                     
## tasktruth   -0.749  0.298  0.298              
## cntxtdngr-:  0.296 -0.745 -0.373 -0.411       
## cntxtnndst:  0.295 -0.372 -0.743 -0.400  0.501
```

## Figure 1a


```r
tc.bs<-bootstrap.ci.tc(d)

tc.bs$context<-factor(tc.bs$stim_type,
                        levels=c('danger-distinct','nondistinctive','bare'),
                        labels=c("dangerous &\n distinctive", 
                                 "nondistinctive &\n irrelevant",
                                 "plain"))

fig1a<-ggplot(tc.bs, aes(x=stim_prevalence,y=truth_num,
                  colour=context, group=context))+
  geom_point(size=3, position=position_dodge(5))+
  geom_line(size=0.5,position=position_dodge(5))+
  geom_errorbar(aes(ymin=YMin,ymax=YMax,colour=context),
              width=5,
              size=0.9,
              position=position_dodge(5))+
  scale_colour_brewer(type='qual',palette=6)+
  #theme(strip.text.x = element_text(size=14,color='black'))+
  scale_y_continuous(breaks=c(0,0.25,0.5,0.75,1),limits=c(0,1))+
  scale_x_continuous(breaks=c(10,30,50,70,90),limits=c(0,100))+
  theme_paper()+ 
  guides(color=guide_legend(title="Context"))+
  xlab("prevalence (in %)")+
  ylab('proportion of "true" responses to generic')+
  coord_fixed(100)+
  theme(legend.key.size=unit(2, "lines"),
        legend.text.align=NULL)
```

## Figure 1b


```r
f.bs<-bootstrap.ci.ip(f.stats)
f.bs$task<-'impliedprevalence'
d.bs<-bootstrap.ci.ip(d.stats)
d.bs$task<-'truthconditions'

m<-rbind(f.bs,d.bs)

# m$context<-factor(m$context,
#                   levels=c('danger-distinct','nondistinctive','bare'),
#                   labels=c("dangerous \n& distinctive", 
#                            "nondistinctive \n& irrelevant",
#                            "plain"))
m$task <- factor(m$task,
                 levels=c("truthconditions","impliedprevalence"),
                 labels=c("truth conditions", "implied prevalence"))

m$context<-factor(m$context,
                  levels=c('danger-distinct','nondistinctive','bare'),
                  labels=c("dangerous & distinctive", 
                                 "nondistinctive & irrelevant",
                                 "plain"))


fig1b<-ggplot(m, aes(x=context,y=imp_subj,fill=context,alpha=task, group=task))+
  geom_bar(stat='identity',position=position_dodge(0.5), width=0.5,color='black')+
  geom_errorbar(aes(ymin=YMin,ymax=YMax),
                width=0.2,
                size=1,
                position=position_dodge(0.5))+
  theme_paper()+
  ylab("average prevalence")+
  scale_fill_brewer(type='qual',palette=6)+
  scale_alpha_manual(values=c(0.4,1))+
  xlab("")+
  theme(legend.position='bottom',
        legend.direction='horizontal',
        legend.box = 'horizontal',
        axis.text.x=element_blank())+
  guides(fill = guide_legend(order = 1), 
          alpha = guide_legend(order = 2))




mylegend<-g_legend(fig1b)

p3 <- arrangeGrob(arrangeGrob(fig1a + theme(legend.position="none"),
                         fig1b + theme(legend.position="none"),
                         nrow=1),
             mylegend, nrow=2,heights=c(10, 1))
```

```
## ymax not defined: adjusting position using y instead
## ymax not defined: adjusting position using y instead
```

```r
p3
```

<img src="./cogsci-generics_files/figure-html/fig1b.png" title="plot of chunk fig1b" alt="plot of chunk fig1b" width="672" />

```r
# ggsave(filename=paste(plotpath,'Xexp1data.png',sep=''),
#        plot=p3,
#        width=14,
#        height=6,
#        dpi=150)
```


# Figure 2: Fixed threshold semantics



```r
setwd("~/Documents/research/generics/cbg2010-replication/models/bayesian_analysis")

d<-read.csv('ft_conditionTC_cnts_expts9_12_generic_mh1000_10_alpha1.csv',header=F)
f<-read.csv('ft_conditionIP_cnts_expts9_12_generic_mh1000_10_alpha1.csv',header=F)


ft.phi <- d %>% select(V1) %>% rename(phi_tc=V1)
ft.phi2 <- f %>% select(V2) %>% rename(phi_ip=V2)
ft.phi<-cbind(ft.phi,ft.phi2)

phi.tidy <- ft.phi %>%
  gather(variable,value) %>%
  separate(variable, into=c('parameter','task'), by='_')

phi.tidy$task<-factor(phi.tidy$task,
                    levels=c('tc','ip'),
                    labels=c("truth conditions","implied prevalence"))

a<-ggplot(phi.tidy,aes(x=value,alpha=task))+
  geom_density(fill='black')+
  theme_paper()+
  scale_alpha_manual(values=c(0.4,1))+
  scale_x_continuous(breaks=c(0,0.25,.5,0.75,1),limits=c(0,1))+
  scale_fill_brewer(type='qual',palette=1)+
  theme(strip.text.x = element_text(size=14,color='black'),
        legend.position='bottom',
        legend.direction='horizontal',
        axis.title.x =element_text(vjust = -0.5,size=30))+
  guides(fill=guide_legend(title="Context"))+
  xlab(expression(phi))+
  ylab("posterior density")

d.tidy <- d %>%
  select(V3,V4,V5) %>%
  rename(dd_tc = V3,
         ni_tc = V4,
         pl_tc = V5) %>%
  gather(variable,value)

f.tidy <- f %>%
  select(V3,V4,V5) %>%
  rename(dd_ip = V3,
         ni_ip = V4,
         pl_ip = V5) %>%
  gather(variable,value)

theta.tidy<-rbind(d.tidy,f.tidy)

theta.tidy<- theta.tidy %>% 
  separate(variable, into=c("context","task"), by="_")

theta.tidy$task<-factor(theta.tidy$task,
                    levels=c('tc','ip'),
                    labels=c("truth conditions","implied prevalence"))

theta.tidy$context<-factor(theta.tidy$context,
                        levels=c('dd','ni','pl'), 
                        labels=c("dangerous & distinctive", 
                                 "nondistinctive & irrelevant",
                                 "plain"))

b<-ggplot(theta.tidy,aes(x=value,fill=context,alpha=task))+
  geom_density()+
  theme_paper()+
  scale_alpha_manual(values=c(0.4,1))+
  scale_x_continuous(breaks=c(10,30,50,70,90),limits=c(0,100))+
  scale_fill_brewer(type='qual',palette=6)+
  theme(strip.text.x = element_text(size=14,color='black'),
        legend.position='bottom',
        legend.direction='horizontal',
        axis.title.x =element_text(vjust = -0.5,size=30))+
  xlab(expression(theta))+
  ylab("posterior density")+
  guides(alpha=F)


p3 <- arrangeGrob(b ,a, nrow=1)
p3
```

<img src="./cogsci-generics_files/figure-html/fig2.ft.png" title="plot of chunk fig2.ft" alt="plot of chunk fig2.ft" width="672" />

```r
# ggsave(filename=paste(plotpath,'fixed_phis_thetas.png',sep=''),
#        plot=p3,
#        width=16,
#        height=4.5,
#        dpi=100)
```

# Figure 3: lvRSA Hyperparameters


```r
setwd("~/Documents/research/generics/cbg2010-replication/models/bayesian_analysis")

d<-read.csv('lvRSA_cnts_c1_expts9_12_generic_mh1000_50_alpha1.csv',header=F)
f<-read.csv('lvRSA_cnts_c2_expts9_12_generic_mh1000_50_alpha1.csv',header=F)
g<-read.csv('lvRSA_cnts_c3_expts9_12_generic_mh1000_50_alpha1.csv',header=F)
d<-rbind(d,f,g)


ft.phi <- d %>% select(V1,V2) %>% 
  rename(phi_tc=V1,phi_ip=V2) %>%
  gather(variable,value) %>% 
  separate(variable,into=c("parameter","task"), by="_")

ddply(ft.phi, .(parameter, task), summarise,
      mean=mean(value),
      CIlow=quantile(value,probs=0.025),
      CIhigh=quantile(value,probs=0.975))
```

```
##   parameter task    mean   CIlow  CIhigh
## 1       phi   ip 0.04887 0.02638 0.07213
## 2       phi   tc 0.08006 0.01848 0.15428
```

```r
qplot(data=ft.phi,x=value,geom='histogram',fill=task)+xlim(0,1)+facet_wrap(~task)
```

```
## stat_bin: binwidth defaulted to range/30. Use 'binwidth = x' to adjust this.
## stat_bin: binwidth defaulted to range/30. Use 'binwidth = x' to adjust this.
```

<img src="./cogsci-generics_files/figure-html/fig3.lvRSAhyperparameters1.png" title="plot of chunk fig3.lvRSAhyperparameters" alt="plot of chunk fig3.lvRSAhyperparameters" width="672" />

```r
lv.alpha<-d %>% select(V36) %>% rename(alpha=V36)
qplot(data=lv.alpha,x=alpha,geom='histogram')
```

```
## stat_bin: binwidth defaulted to range/30. Use 'binwidth = x' to adjust this.
```

<img src="./cogsci-generics_files/figure-html/fig3.lvRSAhyperparameters2.png" title="plot of chunk fig3.lvRSAhyperparameters" alt="plot of chunk fig3.lvRSAhyperparameters" width="672" />

```r
d.tidy <- d %>%
  select(V3,V4, V6, V7, V9, V10) %>%
  rename(dd_gamma = V3,
         dd_delta = V4,
         ni_gamma = V6,
         ni_delta = V7,
         pl_gamma = V9,
         pl_delta = V10) %>%
  gather(variable,value) %>%
  separate(variable, into=c("context","parameter"), by="_")

params.stats<-ddply(d.tidy, .(context,parameter), summarise,
      mean = mean(value),
      CIlow=quantile(value,probs=0.025),
      CIhigh=quantile(value,probs=0.975))

d.tidy$context<-factor(d.tidy$context,
                        levels=c('dd','ni','pl'), 
                        labels=c("dangerous & distinctive", 
                                 "nondistinctive & irrelevant",
                                 "plain"))

d.tidy$parameter<-factor(d.tidy$parameter, levels=c("gamma","delta"))
                      #   labels(expression(gamma),expression(delta)))

plotpath = "~/Documents/research/generics/cogsci-2015//paper/figures/"


c<-ggplot(d.tidy,aes(x=value,fill=context))+
  geom_density(alpha=0.4)+
  #geom_histogram(binwidth=0.01, alpha = 0.8)+
  theme_paper()+
 scale_x_continuous(limits=c(0,0.5))+
  scale_fill_brewer(type='qual',palette=6)+
  facet_grid(parameter~.,scales='free',labeller= label_parsed)+
  theme(strip.text.x = element_text(size=14,color='black'),
        legend.position='bottom',
        legend.direction='horizontal',
        strip.text.y = element_text(size=22,angle=0))+
  guides(fill=guide_legend(title="Context"))+
  xlab("inferred value")+
  ylab("posterior density")

c
```

```
## Warning: Removed 3 rows containing non-finite values (stat_density).
## Warning: Removed 2 rows containing non-finite values (stat_density).
## Warning: Removed 2 rows containing non-finite values (stat_density).
## Warning: Removed 3 rows containing non-finite values (stat_density).
## Warning: Removed 2 rows containing non-finite values (stat_density).
## Warning: Removed 1 rows containing non-finite values (stat_density).
```

<img src="./cogsci-generics_files/figure-html/fig3.lvRSAhyperparameters3.png" title="plot of chunk fig3.lvRSAhyperparameters" alt="plot of chunk fig3.lvRSAhyperparameters" width="672" />

```r
# ggsave(filename=paste(plotpath,'inferred_hyperpriors.png',sep=''),
#        plot=c,
#        width=8,
#        height=6,
#        dpi=100)
```

# Figure 4: Posterior predictives of lvRSA










