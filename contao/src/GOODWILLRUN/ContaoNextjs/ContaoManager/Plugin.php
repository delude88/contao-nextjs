<?php

namespace GOODWILLRUN\DistributedMail\ContaoManager;

use Contao\CoreBundle\ContaoCoreBundle;
use Contao\ManagerPlugin\Bundle\BundlePluginInterface;
use Contao\ManagerPlugin\Bundle\Config\BundleConfig;
use Contao\ManagerPlugin\Bundle\Parser\ParserInterface;
use GOODWILLRUN\DistributedMail\GOODWILLRUNContaoNextjsBundle;

class Plugin implements BundlePluginInterface
{
    /**
     * {@inheritdoc}
     */
    public function getBundles(ParserInterface $parser) 
    {
        return [
            BundleConfig::create(GOODWILLRUNContaoNextjsBundle::class)
                ->setLoadAfter([ContaoCoreBundle::class]),
        ];
    }
}
